document.getElementById('registerButton').addEventListener('click', function(event) {
    const requiredFields = document.querySelectorAll('#schoolForm [required]');
    let allFilled = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            allFilled = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });

    if (!allFilled) {
        event.preventDefault(); // ป้องกันการส่งฟอร์ม
        alert('กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น');
    }
});


// ฟังก์ชันตรวจสอบข้อมูล
function validateForm() {
  var requiredFields = [
      "arto", "name", "degree", "major", "assistant_subject", "level", 
      "preschool-1", "preschool-2", "preschool-3"
  ];

  for (var i = 0; i < requiredFields.length; i++) {
      var field = document.getElementById(requiredFields[i]);
      if (!field.value) {
          alert("กรุณากรอกข้อมูลให้ครบถ้วน");
          return false;
      }
  }
  alert("บันทึกข้อมูลสำเร็จ");
  return true;
}

// ตั้งค่าให้ฟอร์มตรวจสอบเมื่อกดปุ่ม
document.querySelector("form").onsubmit = function(event) {
  event.preventDefault(); // ป้องกันการส่งฟอร์ม
  if (validateForm()) {
      this.submit(); // ส่งฟอร์มเมื่อข้อมูลครบถ้วน
  }
};


document
  .getElementById("schoolForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("ข้อมูลถูกส่งเรียบร้อย!");
  });

document.querySelectorAll('input[name="transport"]').forEach((input) => {
  input.addEventListener("change", function () {
    document.getElementById("otherTransportInput").style.display =
      this.value === "อื่น ๆ" ? "block" : "none";
  });
});

document.querySelectorAll('input[name="facility"]').forEach((input) => {
  input.addEventListener("change", function () {
    document.getElementById("otherFacilityInput").style.display =
      this.value === "อื่น ๆ" ? "block" : "none";
  });
});

document.querySelector(".btn").addEventListener("click", function () {
  document.getElementById("form-section").scrollIntoView({
    behavior: "smooth",
  });
});

document.querySelectorAll(".b2 .btn").forEach(function (button) {
  button.addEventListener("click", function () {
    document.getElementById("footer").scrollIntoView({
      behavior: "smooth",
    });
  });
});

// ระดับการศึกษา
function showDropdown(selectedId) {
  // ซ่อน dropdown ทุกตัว
  document.querySelectorAll("select").forEach(select => select.classList.add("d-none"));

  // แสดงเฉพาะ dropdown ที่เกี่ยวข้อง
  document.getElementById(selectedId).classList.remove("d-none");
}

// ฟังก์ชันสำหรับดึงข้อมูลจังหวัด, อำเภอ และตำบล
document.addEventListener("DOMContentLoaded", function () {
  // ดึงข้อมูลจังหวัด
  fetch("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json")
    .then(response => response.json())
    .then(data => {
      const provinceSelect = document.getElementById("province");
      data.forEach(province => {
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
      fetch("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json")
        .then(response => response.json())
        .then(data => {
          const province = data.find(p => p.id == provinceId);
          province.amphure.forEach(amphure => {
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
      fetch("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json")
        .then(response => response.json())
        .then(data => {
          const province = data.find(p => p.id == provinceId);
          const amphure = province.amphure.find(a => a.id == amphureId);
          amphure.tambon.forEach(tambon => {
            const option = document.createElement("option");
            option.value = tambon.id;
            option.textContent = tambon.name_th;
            subdistrictSelect.appendChild(option);
          });
        });
    }
  };
});



