export default function ({ app }) {
  app.$moment.relativeTimeThreshold('s', 60)
  app.$moment.relativeTimeThreshold('ss', 1)
}
