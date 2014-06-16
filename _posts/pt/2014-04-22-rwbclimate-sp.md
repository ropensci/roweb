---
name: rwbclimate-sp
layout: post
title: Sobreposição de dados de ocorrência de espécies com dados climáticos 
date: 2014-04-22
author: Ted Hart
categories:
- pt
tags:
- R
- API
- espécies
- ocorrência
- mudança climática
- dados climáticos
---


Um dos objetivos do rOpenSci é facilitar a comunicação entre diferentes fontes de dados da internet com nossas ferramentas. Podemos alcançar isto fornecendo funcionalidades dentro dos pacotes que convertam dados direcionados de aplicativos da internet para um formato específico (geralmente um esquema específico do mantenedor) para um formato padrão. A nova versão do [rWBclimate](http://github.com/ropensci/rwbclimate) que acabamos de postar no [CRAN](http://cran.r-project.org/web/packages/rWBclimate/index.html) faz exatamente isto. Em um [post anterior](http://www.ropensci.org/blog/2013/07/29/rWBclimate-rgbif/) sobre como usuários podem combinar dados do [rgbif](http://github.com/ropensci/rgbif) e `rWBclimate`. Anteriormente, pensávamos que seria bem interessante que se pudesse sobrepor pontos em um mapa climático atraente. Após percorrer um longo caminho, desenvolvemos um pacote para obter dados de ocorrência de espécies que é ao mesmo tempo completo e fácil de usar, [spocc](http://github.com/ropensci/spocc), e adicionamos funções de conversão para criar objetos espaciais seja a partir de mapas de dados climáticos ou de ocorrência de espécies. Isso faz com que você obtenha dados de ambas as fontes e então extrair a informação climática dos seus dados de ocorrência de espécies.

No exemplo abaixo, vou baixar dados climáticos no nível de bacias hidrográficas para o México e Estados Unidos, e então os dados de ocorrência para oito espécies de árvores. Depois, vou extrair a temperatura para cada ponto sobrepondo a informação espacialmente e olhar para a distribuição das temperaturas para cada espécie. Além disso, a função de conversão para objetos espaciais te permitirá usar nossos dados com quaisquer [shape files](http://en.wikipedia.org/wiki/Shapefile) que tiver.

O primeiro passo é capturar arquivos [KML](https://developers.google.com/kml/documentation/) para cada rio da bacia hidrográfica que fazem parte dos Estados Unidos e México, as quais [identify with an integer](http://data.worldbank.org/sites/default/files/climate_data_api_basins.pdf).



```r
library("rWBclimate")
# Instale spocc do reposítório do GitHub 
# devtools::install_github("spocc", "ropensci")
library("spocc")
library("taxize")
library("plyr")
library("sp")
```

```r
library(spocc)
### Crie uma pasta para armazenar os arquivos kml
dir.create("~/kmltmp")
```

```r
options(kmlpath = "~/kmltmp")
options(stringsAsFactors = FALSE)

usmex <- c(273:284, 328:365)
### Baixe os arquivos KML e carregue-os 
usmex.basin <- create_map_df(usmex)
```

```r
## Baixe os dados de temperatura 
temp.dat <- get_historical_temp(usmex, "decade")
temp.dat <- subset(temp.dat, temp.dat$year == 2000)

# Junte os dados de temperatura ao data frame do mapa
usmex.map.df <- climate_map(usmex.basin, temp.dat, return_map = F)
```

Neste ponto, acabamos de criar um mapa dos Estados Unidos e México, baixamos a temperatura média entre 1990 e 2000 para cada bacia, e unimos as duas. Agora, vamos obter dados de ocorrência utilizando `spocc` para as oito espécies de árvores  (*Nota:  `rgbif` > 0.6.0 precisa ser instalado para funcionar adequadamente*)

```r
## Capturar dados de ocorrência das oito espécies de árvores.

splist <- c("Acer saccharum", "Abies balsamea", "Arbutus xalapensis", "Betula alleghaniensis", "Chilopsis linearis", "Conocarpus erectus", "Populus tremuloides", "Larix laricina")

## Obtenha dados do bison e gbif 
splist <- sort(splist)
out <- occ(query = splist, from = c("bison", "gbif"), limit = 100)

## Elimine erros dos nomes 
out <- fixnames(out, how = "query")

## Crie um data frame com todos os dados.

out_df <- occ2df(out)
```

Agora que já baixamos os dados de ocorrência das espécies usando os seus nomes científicos, podemos querer saber os seus nomes populares. Para nossa sorte, o pacote `taxize` é ótimo para isso, e podemos capturá-los apenas com algumas linhas de comando.

```r
### Capturando nomes populares
cname <- ldply(sci2comm(get_tsn(splist), db = "itis", simplify = TRUE), function(x) { return(x[1]) })[, 2]
```

```r 
### Agora, vamos criar um vetor de nomes populares para plotar facilmente
### Mas primeiro, vamos ordenar os nomes de maneira que possamos apenas adicionar os  ### nomes 
out_df <- out_df[order(out_df$name), ]
### retire valores NA e 0 das coordenadas
out_df <- out_df[!is.na(out_df$lat), ]
out_df <- out_df[out_df$lat > 0, ]
out_df$common <- rep(cname, table(out_df$name))
```

Agora temos todos os componentes de que precisamos, ou seja, dados de espécies e polígonos espaciais com dados de temperatura inseridos. Antes da fazer a sobreposição espacial, vamos fazer uma breve visualização.


```r
## Agora apenas crie o mapa base para a temperatura 
usmex.map <- ggplot() +
  geom_polygon(data = usmex.map.df, aes(x = long, y = lat, group = group, fill = data, alpha = 0.9)) +
  scale_fill_continuous("Average annual \n temp: 1990-2000", low = "yellow", high = "red") +
  guides(alpha = F) +
  theme_bw(10)

## E sobreponha os dados do gbif 
usmex.map <- usmex.map +
  geom_point(data = out_df, aes(y = latitude, x = longitude, group = common, colour = common)) +
  xlim(-125, -59) +
  ylim(5, 55)

print(usmex.map)
```

![](/assets/blog-images/2014-04-22-rwbclimate-sp/mapping_2.png)

Agora a questão é: qual é a temperatura em cada ponto para cada um das espécies de árvores? Podemos converter nossos dados de ocorrência de espécies para pontos espaciais com `occ_to_sp`, e os dados do `rWBclimate` podem ser convertidos para polígonos espaciais com `kml_to_sp`.  A seguir, podemos repetir este procedimento para cada grupo de espécies, e usar a função `over` para obter dados de temperatura para cada ponto.


```r
## Crie um data frame de um polígono espacial juntando polígonos kml com temperatura 
## Dados
temp_sdf <- kml_to_sp(usmex.basin, df = temp.dat)
### Agora podemos transformar os pontos num polígono espacial:
sp_points <- occ_to_sp(out)

tdat <- vector()
### Calcule as médias 
for (i in 1:length(splist)) {
    tmp_sp <- sp_points[which(sp_points$name == splist[i]), ]
    tmp_t <- over(tmp_sp, temp_sdf)$data
    tdat <- c(tdat, tmp_t)
}
```

O último passo é criar um novo data frame com nossos dados. Infelizmente o tamanho do nosso data frame antigo `out_df` não será o mesmo porque algum dados de latitude e longitude que vieram junto com nossos dados são inválidos, assim todo o data frame será reorganizado. Depois disso, podemos resumi-los com o pacote plyr, obtendo a temperatura média e a latitude para cada espécie. 

```r
### Organize o novo data frame 
spDF <- data.frame(matrix(nrow = dim(sp_points)[1], ncol = 0))
spDF$species <- sp_points$name
spDF <- cbind(coordinates(sp_points), spDF)

### Importante. Tenha certeza de que ordenou todos os pontos em ordem alfabética assim ### como fizemos anteriormente 
spDF <- spDF[order(spDF$species), ]

spDF$cname <- rep(cname, table(sp_points$name))
spDF$temp <- tdat
### Retire NAs
spDF <- spDF[!is.na(spDF$temp), ]

## Crie um objeto com summary
summary_data <- ddply(spDF, .(cname), summarise, mlat = mean(latitude), mtemp = mean(temp),
    sdlat = sd(latitude), sdtemp = sd(temp))
```

Primeiro, vamos olhar para cada plot entre temperatura média e latitude, e identificar os pontos para os quais iremos plotar os nomes populares.

```r
ggplot(summary_data, aes(x = mlat, y = mtemp, label = cname)) +
  geom_text() +
  xlab("Mean Latitude") +
  ylab("Mean Temperature (C)") +
  theme_bw() +
  xlim(10, 50)
```

![](/assets/blog-images/2014-04-22-rwbclimate-sp/means.png)


Isso nos dá uma noção sobre como as médias de cada valor estão relacionadas, mas também podemos olhar a distribuição das temperaturas com boxplots. 

```r
ggplot(spDF, aes(as.factor(cname), temp)) +
  geom_boxplot() +
  theme_bw(13) +
  ylab("Temperature") +
  xlab("Common Name") +
  theme(axis.text.x = element_text(angle = 45, hjust = 0.5, vjust = 0.5))
```

![](/assets/blog-images/2014-04-22-rwbclimate-sp/boxplots.png)

Isto nos dá a noção de quão ampla é a distribuição das temperaturas, bem ajuda a visualizar alguns valores extremos. As distribuições parecem ser bastante enviesadas, e isto provavelmente reflete a baixa resolução espacial dos nossos dados de temperatura, comparados com dados de ocorrência de espécies. Porém, este exemplo mostra como é fácil combinar dados de múltiplos pacotes do rOpenSci. Continuaremos trabalhando para melhorar a integração de dados heterogêneos através de nossas ferramentas.
