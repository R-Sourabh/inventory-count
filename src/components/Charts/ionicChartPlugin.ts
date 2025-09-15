import { Chart } from 'chart.js';

const ionicChartPlugin = {
  id: 'ionicStyles',
  beforeInit: function(chart: any) {
  console.log('chart :', chart);
    const style = window.getComputedStyle(document.body);
    
    // Get Ionic font styles
    const fontFamily = style.getPropertyValue('--ion-font-family').trim();
    const fontSize = style.getPropertyValue('--ion-font-size-base').trim();
    console.log(fontFamily)
    console.log(fontSize)


    // Set global Chart.js font defaults
    Chart.defaults.font.family = fontFamily;
    Chart.defaults.font.size = parseInt(fontSize);
  }
};

export default ionicChartPlugin; 