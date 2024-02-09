// * CALCULATOR NUMBER
const averageCalculations = document.getElementById("averageCalculation")
const averageCalculation = document.getElementById("averageCalculation").addEventListener("submit", averageCalculator)
const averageCalculatorArea = document.getElementById("averageCalculatorArea")
const averageCalculatorAreaEvent = document.getElementById("averageCalculatorArea").addEventListener("keyup", blockKey)

// * NOTES * SUBMİT
const averageNote = document.getElementById("averageNote").addEventListener("submit", averageCalculator)
const averageNoteBtn = document.getElementById("btncalculator").addEventListener("click", averageCalculator)
const averageNoteinput = document.getElementById("averageNoteinput")

// * LAST CALCULATED
const oneCalculated = document.getElementById("calculation")

// * LOCAL STORAGE
if(!JSON.parse(localStorage.getItem("oldNumbers")) && !JSON.parse(localStorage.getItem("oldNumbers2"))){
  localStorage.setItem("oldNumbers2", JSON.stringify([]))
  localStorage.setItem("oldNumbers", JSON.stringify([]))
  localStorage.setItem("Numbers", JSON.stringify([]))
} 

window.addEventListener("beforeunload", createData())

function averageCalculator(x){

if(averageCalculatorArea.value.length > 0 && !averageCalculatorArea.value == ""){


/* For döngüsü ile elemanın boşluk yada virgül olduğu yerleri yakalayıp oraya kadar yakaladığımız rakamları 1 eleman olacak şekilde
 diziye kayıt ettiğimiz bir for döngüsü yazılacak. Yakalanan elemanları number verisine çevirip hesaplama yaptıktan sonra tekrar diziye oradanda
 local stroge'a kayıt edip diğer işlemleri yaptıracağız. */

  let i = 0;
  let Numbers = "";
  let newNumbers = [];
  let oldNumbers = [];

  for(i; i <= averageCalculatorArea.value.length; i++){
    if(averageCalculatorArea.value[i] == " " || averageCalculatorArea.value[i] == "," || i == averageCalculatorArea.value.length){

      if(averageCalculatorArea.value[i-1] == " " || averageCalculatorArea.value[i-1] == ","){
          continue;
      } else {
         newNumbers.push(Numbers) 
         Numbers = ""
      }

    } else {
      if(!isNaN(averageCalculatorArea.value[i])) {
        Numbers += averageCalculatorArea.value[i] 
      } else {
        alert("Hatalı giriş yaptın :)")
        return 0;
      }
    }
  }


/* Not kayıt etme işlemini if-else sorgusu ile yapıyoruz, ilk öncelikle not inputuna herhangi bir şey yazılmışmı diye kontrol ediyoruz,
   daha sonra eğer yazıldıysa yazılan veriyi yazılmadıysa "Not Bulunamadı" şeklinde default değerimizi atıyoruz sonrasında istemci kodları derlemeye devam ediyor. */


  if(i-1 == averageCalculatorArea.value.length){
    if(averageNoteinput.value.length <= 1 && averageNoteinput.value == ""){
      newNumbers.push("Not Bulunamadı")  
    } else {
      averageNoteinput.value.trim()
      newNumbers.push(averageNoteinput.value)  
    }
  }

/* Local Storage'da daha önce hesapladığıız veri var ise bu verileri oldNumbers'a kayıt ediyor eğer oldNumbers alanına daha önceden veri kayıt edildiyse 
    oldNumbers2 oluşturup onun içerisinde bir önceki hesaplamada kullandığımız verileri kayıt ediyoruzki son hesaplananlar ekranına yazdırabilelim. */

  if(JSON.parse(localStorage.getItem("Numbers")).length > 0){

    if(JSON.parse(localStorage.getItem("oldNumbers")).length > 0){

        if(JSON.parse(localStorage.getItem("oldNumbers2")).length > 0) {
          oldNumbers.push(localStorage.getItem("oldNumbers2"))
          localStorage.setItem("oldNumbers", oldNumbers)
        }

        localStorage.setItem("oldNumbers2", JSON.stringify(newNumbers))
    } else {
      localStorage.setItem("oldNumbers", JSON.stringify(newNumbers))
    }
  }


/* Tuttuğumuz verileri en sonda local storage'ye kayıt ediyoruz normalde herhangi bir veri tabanınada kayıt edebiliriz dilerseniz kendiniz bunu kolay bir şekilde
yapabilirsiniz. */

  localStorage.setItem("Numbers", JSON.stringify(newNumbers))
  if(!JSON.parse(localStorage.getItem("oldNumbers")).length > 0) localStorage.setItem("oldNumbers", JSON.stringify(newNumbers))


/* Bu kısımda sayfa yenilenmeden butona tıklandığında son hesaplananları güncelliyoruz */

  if(document.getElementById("oldCalculated") && document.getElementById("oldCalculated2") || document.getElementById("oldCalculated")){
    deleteData()
    createData()
  } else {
    createData()
  }

  x.preventDefault()

 } else {
  alert("Hatalı giriş yaptın :)")
 }
}


function createData() {
if(JSON.parse(localStorage.getItem("oldNumbers")).length > 0){

/* for ile 2 kademeli döngü açacağız döngünün 1. kademesinde oldNumbers sorgulanacak oldNumbers elemanları ekrana tek elementin içine for içinde for ile yazdırıldıktan sonra
   en dıştakı for döngümüz 2. kademeye geçip oldNumbers 2'yi sorgulayacak buradada 3. for döngümüzü açıp elemanlarını ekrana yazdıracağız */

   let veri = "oldNumbers"
   let veriSayac = 0;
   let TrialConclusion = 0;


    for(let k = 0; k < JSON.parse(localStorage.getItem(veri)).length; k++){
      if(JSON.parse(localStorage.getItem(veri)).length == k+1){

       if(JSON.parse(localStorage.getItem("oldNumbers2")).length > 0){

        if(veriSayac == 0){
          const lastCalculated = document.createElement("p")
          oneCalculated.appendChild(lastCalculated)
          lastCalculated.setAttribute("style", "display: block;")
          lastCalculated.setAttribute("id", "oldCalculated")
          lastCalculated.innerText += JSON.parse(localStorage.getItem("oldNumbers")) + ", Sonuç= " + Math.round(TrialConclusion/(JSON.parse(localStorage.getItem("oldNumbers")).length-1)) 

          veri = "oldNumbers2"
          TrialConclusion = 0
          k = -1
          veriSayac++  
        } else {
          const lastCalculated = document.createElement("p")
          oneCalculated.appendChild(lastCalculated)
          lastCalculated.setAttribute("style", "display: block;")
          lastCalculated.setAttribute("id", "oldCalculated2")
          lastCalculated.innerText += JSON.parse(localStorage.getItem("oldNumbers2")) + ", Sonuç= " + Math.round(TrialConclusion/(JSON.parse(localStorage.getItem("oldNumbers2")).length-1)) 
        }

       } else {
        const lastCalculated = document.createElement("p")
        oneCalculated.appendChild(lastCalculated)
        lastCalculated.setAttribute("style", "display: block;")
        lastCalculated.setAttribute("id", "oldCalculated")
        lastCalculated.innerText += JSON.parse(localStorage.getItem("oldNumbers")) + ", Sonuç= " + Math.round(TrialConclusion/(JSON.parse(localStorage.getItem("oldNumbers")).length-1)) 
       }

      } else {
        TrialConclusion += Number(JSON.parse(localStorage.getItem(veri))[k])
      }

   }
 }
}

function deleteData() {
  const calculatedDeleteElement = document.getElementById("oldCalculated")
  const calculatedDeleteElement2 = document.getElementById("oldCalculated2")

  if(document.getElementById("oldCalculated") && document.getElementById("oldCalculated2")){
    calculatedDeleteElement.remove()
    calculatedDeleteElement2.remove()
  } else if (document.getElementById("oldCalculated")){
    calculatedDeleteElement.remove()
  }

}

function blockKey(e) {
  if(e.keyCode == 13){
    window.location.reload()
  }
}