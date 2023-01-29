// 配置BASE_URL
let BASE_URL = ""
const TIME_OUT = 10000
if(process.env.NODE_ENV === "development") {
  BASE_URL = "http://dev"
} else if(process.env.NODE_ENV === "production") {
  BASE_URL = "http://dev"
} else {
  BASE_URL = "http://dev"
}

export { BASE_URL, TIME_OUT }