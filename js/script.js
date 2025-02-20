// ฟังก์ชันสำหรับดึงข้อมูลจังหวัด, อำเภอ และตำบล
document.addEventListener("DOMContentLoaded", function () {
  // ดึงข้อมูลจังหวัด
  fetch(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const provinceSelect = document.getElementById("province");
      data.forEach((province) => {
        const option = document.createElement("option");
        option.value = province.id;
        option.textContent = province.name_th;
        provinceSelect.appendChild(option);
      });
    });

  // ฟังก์ชันอัปเดตอำเภอ
  window.updateAmphur = function () {
    const provinceId = document.getElementById("province").value;
    const districtSelect = document.getElementById("district");
    districtSelect.innerHTML = "<option value=''>เลือกอำเภอ</option>"; // เคลียร์อำเภอเก่า

    if (provinceId) {
      fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
      )
        .then((response) => response.json())
        .then((data) => {
          const province = data.find((p) => p.id == provinceId);
          province.amphure.forEach((amphure) => {
            const option = document.createElement("option");
            option.value = amphure.id;
            option.textContent = amphure.name_th;
            districtSelect.appendChild(option);
          });
        });
    }
  };

  // ฟังก์ชันอัปเดตตำบล
  window.updateTambon = function () {
    const amphureId = document.getElementById("district").value;
    const subdistrictSelect = document.getElementById("subdistrict");
    subdistrictSelect.innerHTML = "<option value=''>เลือกตำบล</option>"; // เคลียร์ตำบลเก่า

    if (amphureId) {
      const provinceId = document.getElementById("province").value;
      fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
      )
        .then((response) => response.json())
        .then((data) => {
          const province = data.find((p) => p.id == provinceId);
          const amphure = province.amphure.find((a) => a.id == amphureId);
          amphure.tambon.forEach((tambon) => {
            const option = document.createElement("option");
            option.value = tambon.id;
            option.textContent = tambon.name_th;
            subdistrictSelect.appendChild(option);
          });
        });
    }
  };
});
