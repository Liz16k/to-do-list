const format = (time) => (time > 9) ? time : '0' + time

export function Todo (content) {
  const time = new Time()
  this.id = time.date.getTime()
  this.content = content
  this.createdAt = time.formatTime
  this.isChecked = false
}

function Time () {
  const date = new Date() 
  this.date = date
  this.day = date.getDate()
  this.month = date.getMonth() + 1
  this.hour = date.getHours()
  this.minute = date.getMinutes()
  this.formatTime = `${format(this.hour)}:${format(this.minute)} ${format(this.day)}.${format(this.month)}`
}
