$.ajax({url:"https://bitbucket.org/OggiDanailov/firm/raw/2df585250847781831c5ab8ab4a7fdff8f5ef8fc/finances.json",
// data: {t:searchTitle.value},
success: function(response) {
  let theFirmInfo = JSON.parse(response);
  console.log(theFirmInfo);
  console.log(theFirmInfo.employees);

}
})
