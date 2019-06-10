export class GridUtils {
  static numberFormatter(params) {
    return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  static dateFormatter(params) {
    return new Date(params.value).toLocaleDateString();
  }
  static minutesSecondsFormatter(params) {
    const d = new Date(params.value);
    const seconds = d.getUTCSeconds();
    return d.getUTCMinutes() + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
  }
  static percentileStyles(params) {
    if (params.value >= 95) {
      return {color: '#ff8000'}; // orange
    } else if (params.value >= 75) {
      return {color: '#a335ee'}; // purple
    } else if (params.value >= 50) {
      return {color: '#0070ff'}; // blue
    } else if (params.value >= 25) {
      return {color: '#1eff00'}; // green
    } else {
      return {color: '#666666'}; // grey
    }
  }
}
