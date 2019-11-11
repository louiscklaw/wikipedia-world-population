#!/usr/bin/env node

// parsing the world population from https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population

const fs = require('fs')

var Xray = require( 'x-ray' )
var x = Xray({filters:{
  trim: (txt_in) => {
    return txt_in.trim()
  }
}})

const col_rank=1

const col_names = [
  'rank', 'country', 'population','date', 'world_population_pct', 'source','source_href'
]

var lookup_col_name_fr_idx = (idx) => {
  return col_names[idx]
}

var lookup_idx_fr_col_name = (col_name) =>{
  return col_names.indexOf(col_name)
}

x('https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population',
  'table.wikitable tr',
  [{
    1: 'td:nth-of-type(1) | trim',  //rank
    2: 'td:nth-of-type(2) | trim',  //country
    3: 'td:nth-of-type(3) | trim',  //population
    4: 'td:nth-of-type(4) | trim',  //date
    5: 'td:nth-of-type(5) | trim',  //world_population_pct
    6: 'td:nth-of-type(6) | trim',   //source
    7: 'td:nth-of-type(6) a@href',   //source_href
  }]
)
  .then(res => {
    const now = new Date()
    fs.writeFileSync('./wikipedia_world_population.json', JSON.stringify({
      result: res,
      last_update: now.toGMTString()
    }))
  })