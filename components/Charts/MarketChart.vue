<template>
  <div ref="chartdiv"></div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import { mapGetters } from 'vuex'

am4core.useTheme(am4themesAnimated)

export default {
  computed: mapGetters({
    dailyHistoryPrice: 'price/getDailyHistoryPrice'
  }),
  mounted () {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
    const data = []
    const price = this.dailyHistoryPrice

    const priceArray = price.map(i => i.price)
    const minPrice = Math.min.apply(0, priceArray)
    const maxPrice = Math.max.apply(null, priceArray)

    for (let i = price.length - 1; i >= 0; i--) {
      data.push({
        date: new Date(price[i][0]),
        count: price[i][1]
      })
    }

    chart.data = data

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.disabled = true
    dateAxis.renderer.labels.template.disabled = true
    dateAxis.startLocation = 0.5
    dateAxis.endLocation = 0.5
    dateAxis.dateFormats.setKey('day', 'dd/MM')
    dateAxis.periodChangeDateFormats.setKey('day', 'dd/MM')

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.min = minPrice
    valueAxis.max = maxPrice
    valueAxis.renderer.grid.template.disabled = true
    valueAxis.renderer.baseGrid.disabled = true
    valueAxis.renderer.labels.template.disabled = true

    const gradient1 = new am4core.LinearGradient()
    gradient1.addColor(am4core.color('#1791F2'))
    gradient1.addColor(am4core.color('#1791F2'))

    const series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'date'
    series.dataFields.valueY = 'count'
    series.stroke = gradient1
    series.fill = gradient1
    series.fillOpacity = 0.1
    series.tensionX = 10
    series.strokeWidth = 2

    this.chart = chart
  },

  beforeDestroy () {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>
