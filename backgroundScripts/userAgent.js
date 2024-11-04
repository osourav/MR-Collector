class UserAgent {
   constructor(title, uaString, vendor, badge, isMobile, platform) {
      this.title = title;
      this.uaString = uaString;
      this.vendor = vendor;
      this.badge = badge;
      this.isMobile = isMobile;
      this.platform = platform;
   }
}

const USER_AGENTS = {
   mobile: [
      new UserAgent(
         "Samsung Galaxy S20",
         "Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-G981B",
         true,
         "Android"
      ),
      new UserAgent(
         "Nexus 4",
         "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36",
         "Google",
         "Nexus 4",
         true,
         "Android"
      ),
      new UserAgent(
         "Google Pixel 2",
         "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36 Edg/86.0.622.51",
         "Google",
         "Pixel 2",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy S10",
         "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "K",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy K",
         "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
         "Samsung",
         "K",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy K (gzip)",
         "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36,gzip(gfe)",
         "Samsung",
         "K (gzip)",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy S22",
         "Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-S901B",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy S22 US",
         "Mozilla/5.0 (Linux; Android 13; SM-S901U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-S901U",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy S22 Ultra",
         "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-S908B",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy S22 Ultra US",
         "Mozilla/5.0 (Linux; Android 13; SM-S908U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-S908U",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy S21",
         "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-G991B",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy S21 US",
         "Mozilla/5.0 (Linux; Android 13; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-G991U",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy S21 Ultra",
         "Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-G998B",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy S21 Ultra US",
         "Mozilla/5.0 (Linux; Android 13; SM-G998U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-G998U",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy A53",
         "Mozilla/5.0 (Linux; Android 13; SM-A536B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-A536B",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy A53 US",
         "Mozilla/5.0 (Linux; Android 13; SM-A536U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-A536U",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy A51",
         "Mozilla/5.0 (Linux; Android 13; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-A515F",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy A51 US",
         "Mozilla/5.0 (Linux; Android 13; SM-A515U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-A515U",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy S10",
         "Mozilla/5.0 (Linux; Android 12; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-G973F",
         true,
         "Android"
      ),
      new UserAgent(
         "Samsung Galaxy S10 US",
         "Mozilla/5.0 (Linux; Android 12; SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Samsung",
         "SM-G973U",
         true,
         "Android"
      ),
      new UserAgent(
         "Google Pixel 6",
         "Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Google",
         "Pixel 6",
         true,
         "Android"
      ),
      new UserAgent(
         "Google Pixel 6a",
         "Mozilla/5.0 (Linux; Android 13; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Google",
         "Pixel 6a",
         true,
         "Android"
      ),
      new UserAgent(
         "Google Pixel 6 Pro",
         "Mozilla/5.0 (Linux; Android 13; Pixel 6 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Google",
         "Pixel 6 Pro",
         true,
         "Android"
      ),
      new UserAgent(
         "Google Pixel 7",
         "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Google",
         "Pixel 7",
         true,
         "Android"
      ),
      new UserAgent(
         "Google Pixel 7 Pro",
         "Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Google",
         "Pixel 7 Pro",
         true,
         "Android"
      ),
      new UserAgent(
         "Moto G Pure",
         "Mozilla/5.0 (Linux; Android 12; moto g pure) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Motorola",
         "Moto G Pure",
         true,
         "Android"
      ),
      new UserAgent(
         "Moto G Stylus 5G",
         "Mozilla/5.0 (Linux; Android 12; moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Motorola",
         "Moto G Stylus 5G",
         true,
         "Android"
      ),
      new UserAgent(
         "Moto G Stylus 5G (2022)",
         "Mozilla/5.0 (Linux; Android 12; moto g stylus 5G (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Motorola",
         "Moto G Stylus 5G (2022)",
         true,
         "Android"
      ),
      new UserAgent(
         "Moto G 5G (2022)",
         "Mozilla/5.0 (Linux; Android 12; moto g 5G (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Motorola",
         "Moto G 5G (2022)",
         true,
         "Android"
      ),
      new UserAgent(
         "Moto G Power (2022)",
         "Mozilla/5.0 (Linux; Android 12; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Motorola",
         "Moto G Power (2022)",
         true,
         "Android"
      ),
      new UserAgent(
         "Moto G Power (2021)",
         "Mozilla/5.0 (Linux; Android 11; moto g power (2021)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Motorola",
         "Moto G Power (2021)",
         true,
         "Android"
      ),
      new UserAgent(
         "Redmi Note 9 Pro",
         "Mozilla/5.0 (Linux; Android 12; Redmi Note 9 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Xiaomi",
         "Redmi Note 9 Pro",
         true,
         "Android"
      ),
      new UserAgent(
         "Huawei P30",
         "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Huawei",
         "VOG-L29",
         true,
         "Android"
      ),
      new UserAgent(
         "Huawei P30 Lite",
         "Mozilla/5.0 (Linux; Android 10; MAR-LX1A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Huawei",
         "MAR-LX1A",
         true,
         "Android"
      ),
      new UserAgent(
         "Xiaomi Mi 11",
         "Mozilla/5.0 (Linux; Android 13; M2101K6G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Xiaomi",
         "M2101K6G",
         true,
         "Android"
      ),
      new UserAgent(
         "Xiaomi Mi 10T Pro",
         "Mozilla/5.0 (Linux; Android 12; M2102J20SG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "Xiaomi",
         "M2102J20SG",
         true,
         "Android"
      ),
      new UserAgent(
         "OnePlus Nord N200",
         "Mozilla/5.0 (Linux; Android 12; DE2118) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
         "OnePlus",
         "DE2118",
         true,
         "Android"
      ),
      new UserAgent(
         "iPhone SE (3rd gen)",
         "Mozilla/5.0 (iPhone14,6; U; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19E241 Safari/602.1",
         "Apple",
         "iPhone14,6",
         true,
         "iOS"
      ),
      new UserAgent(
         "iPhone 13 Pro",
         "Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1",
         "Apple",
         "iPhone14,3",
         true,
         "iOS"
      ),
      new UserAgent(
         "iPhone 12",
         "Mozilla/5.0 (iPhone13,2; U; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1",
         "Apple",
         "iPhone13,2",
         true,
         "iOS"
      ),
      new UserAgent(
         "iPhone 11",
         "Mozilla/5.0 (iPhone12,1; U; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1",
         "Apple",
         "iPhone12,1",
         true,
         "iOS"
      ),
      new UserAgent(
         "iPhone 11 (12.0)",
         "Mozilla/5.0 (iPhone12,1; U; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1",
         "Apple",
         "iPhone12,1",
         true,
         "iOS"
      ),
      new UserAgent(
         "iPhone 11 Pro",
         "Mozilla/5.0 (iPhone12,3; U; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1",
         "Apple",
         "iPhone12,3",
         true,
         "iOS"
      ),
      new UserAgent(
         "iPhone 11 Pro (13.0)",
         "Mozilla/5.0 (iPhone12,3; U; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1",
         "Apple",
         "iPhone12,3",
         true,
         "iOS"
      ),
   ],
   pc: [
      new UserAgent(
         "Firefox 31",
         "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20100101 Firefox/31.0",
         "Mozilla",
         "FF31",
         false,
         "Windows"
      ),
      new UserAgent(
         "Internet Explorer 11",
         "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
         "Microsoft",
         "IE11",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 36",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/36.0.1985.143 Safari/537.36",
         "Google",
         "Chrome36",
         false,
         "Windows"
      ),
      new UserAgent(
         "Firefox 32",
         "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0",
         "Mozilla",
         "FF32",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 31",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/31.0.1650.63 Safari/537.36",
         "Google",
         "Chrome31",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 35",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/35.0.1916.153 Safari/537.36",
         "Google",
         "Chrome35",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 37",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/37.0.2062.120 Safari/537.36",
         "Google",
         "Chrome37",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 23",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML like Gecko) Chrome/23.0.1271.95 Safari/537.11",
         "Google",
         "Chrome23",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 26",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.31 (KHTML like Gecko) Chrome/26.0.1410.64 Safari/537.31",
         "Google",
         "Chrome26",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 36 (build 125)",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/36.0.1985.125 Safari/537.36",
         "Google",
         "Chrome36-125",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 36",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/36.0.1985.143 Safari/537.36",
         "Google",
         "Chrome36",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 30",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/30.0.1599.101 Safari/537.36",
         "Google",
         "Chrome30",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 27",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/27.0.1453.110 Safari/537.36",
         "Google",
         "Chrome27",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 37",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/37.0.2062.103 Safari/537.36",
         "Google",
         "Chrome37",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 37",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/37.0.2062.120 Safari/537.36",
         "Google",
         "Chrome37",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 39",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/39.0.2171.95 Safari/537.36",
         "Google",
         "Chrome39",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 23",
         "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.11 (KHTML like Gecko) Chrome/23.0.1271.64 Safari/537.11",
         "Google",
         "Chrome23",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 31",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/31.0.1650.63 Safari/537.36",
         "Google",
         "Chrome31",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 31",
         "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/31.0.1650.63 Safari/537.36",
         "Google",
         "Chrome31",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 36",
         "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/36.0.1985.143 Safari/537.36",
         "Google",
         "Chrome36",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 33",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/33.0.1750.154 Safari/537.36",
         "Google",
         "Chrome33",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 38",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/38.0.2125.111 Safari/537.36",
         "Google",
         "Chrome38",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 37",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/37.0.2062.103 Safari/537.36",
         "Google",
         "Chrome37",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 35",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/35.0.1916.114 Safari/537.36",
         "Google",
         "Chrome35",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 37",
         "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/37.0.2062.120 Safari/537.36",
         "Google",
         "Chrome37",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 35",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/35.0.1916.153 Safari/537.36",
         "Google",
         "Chrome35",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 21",
         "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.1 (KHTML like Gecko) Chrome/21.0.1180.89 Safari/537.1",
         "Google",
         "Chrome21",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 36",
         "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/36.0.1985.143 Safari/537.36",
         "Google",
         "Chrome36",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 31",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/31.0.1650.57 Safari/537.36",
         "Google",
         "Chrome31",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 37",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/37.0.2062.124 Safari/537.36",
         "Google",
         "Chrome37",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 37",
         "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/37.0.2062.103 Safari/537.36",
         "Google",
         "Chrome37",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 26",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML like Gecko) Chrome/26.0.1410.64 Safari/537.31",
         "Google",
         "Chrome26",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 26",
         "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.31 (KHTML like Gecko) Chrome/26.0.1410.64 Safari/537.31",
         "Google",
         "Chrome26",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 36",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/36.0.1985.125 Safari/537.36",
         "Google",
         "Chrome36",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 32",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/32.0.1700.107 Safari/537.36",
         "Google",
         "Chrome32",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 28",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/28.0.1500.95 Safari/537.36",
         "Google",
         "Chrome28",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 23",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML like Gecko) Chrome/23.0.1271.95 Safari/537.11",
         "Google",
         "Chrome23",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 34",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/34.0.1847.116 Safari/537.36",
         "Google",
         "Chrome34",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 30",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/30.0.1599.101 Safari/537.36",
         "Google",
         "Chrome30",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 23",
         "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.11 (KHTML like Gecko) Chrome/23.0.1271.97 Safari/537.11",
         "Google",
         "Chrome23",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 39",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/39.0.2171.95 Safari/537.36",
         "Google",
         "Chrome39",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 27",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/27.0.1453.116 Safari/537.36",
         "Google",
         "Chrome27",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 23",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML like Gecko) Chrome/23.0.1271.64 Safari/537.11",
         "Google",
         "Chrome23",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 30",
         "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/30.0.1599.101 Safari/537.36",
         "Google",
         "Chrome30",
         false,
         "Windows"
      ),
      new UserAgent(
         "Firefox 12",
         "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0",
         "Mozilla",
         "FF12",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 34",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/34.0.1847.131 Safari/537.36",
         "Google",
         "Chrome34",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 28",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/28.0.1500.72 Safari/537.36",
         "Google",
         "Chrome28",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 33",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/33.0.1750.154 Safari/537.36",
         "Google",
         "Chrome33",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 35",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/35.0.1916.114 Safari/537.36",
         "Google",
         "Chrome35",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 29",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/29.0.1547.66 Safari/537.36",
         "Google",
         "Chrome29",
         false,
         "Windows"
      ),
      new UserAgent(
         "Firefox 36",
         "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:36.0) Gecko/20100101 Firefox/36.0",
         "Mozilla",
         "FF36",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 29",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/29.0.1547.76 Safari/537.36",
         "Google",
         "Chrome29",
         false,
         "Windows"
      ),
      new UserAgent(
         "Firefox 16",
         "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:16.0) Gecko/20100101 Firefox/16.0",
         "Mozilla",
         "FF16",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 22",
         "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.4 (KHTML like Gecko) Chrome/22.0.1229.94 Safari/537.4",
         "Google",
         "Chrome22",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 23",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML like Gecko) Chrome/23.0.1271.97 Safari/537.11",
         "Google",
         "Chrome23",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 35",
         "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/35.0.1916.153 Safari/537.36",
         "Google",
         "Chrome35",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 30",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/30.0.1599.69 Safari/537.36",
         "Google",
         "Chrome30",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 29",
         "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/29.0.1547.76 Safari/537.36",
         "Google",
         "Chrome29",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 25",
         "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.22 (KHTML like Gecko) Chrome/25.0.1364.172 Safari/537.22",
         "Google",
         "Chrome25",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 29",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/29.0.1547.76 Safari/537.36",
         "Google",
         "Chrome29",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 31",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/31.0.1650.57 Safari/537.36",
         "Google",
         "Chrome31",
         false,
         "Windows"
      ),
      new UserAgent(
         "Chrome 27",
         "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML like Gecko) Chrome/27.0.1453.116 Safari/537.36",
         "Google",
         "Chrome27",
         false,
         "Windows"
      ),
   ],
};

/**
 * @param {"mobile" | "pc"} deviceType
 * @returns {string} string
 **/
function getRandomUserAgent(deviceType = "pc") {
   const agents = USER_AGENTS[deviceType];
   return agents[Math.floor(Math.random() * agents.length)];
}

/**
 * @param {string} userAgent
 **/
async function updateUserAgent(userAgent, tabId) {
   const is = await setUserAgentInContentLocalStorage(userAgent, tabId);

   if (is) {
      const ResourceTypes = [
         "main_frame",
         "sub_frame",
         "stylesheet",
         "script",
         "image",
         "font",
         "object",
         "xmlhttprequest",
         "ping",
         "csp_report",
         "media",
         "websocket",
         "webtransport",
         "webbundle",
         "other",
      ];
      
      const userAgentRule = {
         id: Math.floor(Math.random() * 10000),
         priority: 1,
         condition: {
            urlFilter: "*bing*",
            resourceTypes: ResourceTypes,
         },
         action: {
            type: "modifyHeaders",
            requestHeaders: [
               {
                  header: "User-Agent",
                  operation: "set",
                  value: userAgent.uaString,
               },
            ],
         },
      };

      chrome.declarativeNetRequest.getDynamicRules(async (existingRules) => {
         const allRuleIds = existingRules.map((rule) => rule.id);

         try {
            await chrome.declarativeNetRequest.updateDynamicRules({
               removeRuleIds: allRuleIds,
               addRules: [userAgentRule],
            });
         } catch (error) {
            console.log("Failed to update user agent:", error);
         }
      });
      return true;
   } else {
      return false;
   }
}
