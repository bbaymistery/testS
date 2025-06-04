import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss"
const translateDatas = {
    en: `<div>
  <p><strong>Please allow sufficient time to clear immigration and baggage reclaim.</strong> After the requested pickup time, we offer <strong>60 minutes of FREE waiting time</strong> at the airport.</p>

  <p>Our driver will be waiting for you <strong>inside the arrivals hall</strong> at the designated pickup point. The driver will be holding an <strong>“APL Transfer”</strong> name board with your name on it and will assist you to your vehicle.</p>

  <h3>Special Note for Istanbul Airport:</h3>
  <p>At <strong>Istanbul Airport</strong>, we have an <strong>APL Transfers Office inside the arrivals hall</strong> to assist with all pickups, including early or delayed flight arrivals.</p>

  <p>If you realise that you will not be able to meet the driver within the 60 minutes of free waiting time, please contact us.</p>

  <ul>
    <li>Upon your request, we can hold the driver for <strong>an additional 30 minutes</strong> at a charge of <strong>€10 / £10 / $10</strong>.</li>
    <li>If you are still not out within this extended period, the driver will be pulled off, and the booking will be <strong>registered as a no-show</strong>.</li>
  </ul>

  <h4>Example:</h4>
  <p>If your flight lands at <strong>10:00 AM</strong> and you have requested your pickup time to be <strong>60 minutes after flight landing</strong>, our driver will be in the terminal at <strong>11:00 AM</strong>.</p>

  <ul>
    <li>The driver will wait until <strong>12:00 PM</strong> free of charge.</li>
    <li>After this, if you request, the driver can wait an <strong>extra 30 minutes</strong> at an additional cost of <strong>€10 / £10 / $10</strong>.</li>
  </ul>

  <h4>Important:</h4>
  <ul>
    <li>APL Transfers provides <strong>60 minutes of free waiting time</strong> from the requested pickup time.</li>
    <li>Any additional waiting time beyond this is charged at <strong>€10 / £10 / $10 per 30 minutes</strong>.</li>
  </ul>
</div>
`,

    tr: `<div>
  <p><strong>Lütfen pasaport kontrolü ve bagaj teslimi için yeterli zaman ayırın.</strong> Talep edilen karşılama saatinden sonra, havaalanında <strong>60 dakikalık ÜCRETSİZ bekleme süresi</strong> sunuyoruz.</p>

  <p>Şoförümüz sizi belirlenen karşılama noktasında <strong>geliş salonunun içinde</strong> bekliyor olacak. Sürücü, elinde isminizin yazılı olduğu <strong>“APL Transfer”</strong> isim panosu ile sizi karşılayacak ve aracınıza yönlendirecektir.</p>

  <h3>İstanbul Havalimanı için özel not:</h3>
  <p><strong>İstanbul Havalimanı</strong>'nda, erken veya gecikmeli uçuşlar dahil tüm karşılama işlemlerine yardımcı olan <strong>APL Transfer Ofisi geliş salonu içinde</strong> bulunmaktadır.</p>

  <p>Eğer ücretsiz 60 dakikalık bekleme süresi içinde şoförle buluşamayacağınızı fark ederseniz, lütfen bizimle iletişime geçin.</p>

  <ul>
    <li>Talebiniz üzerine, şoför <strong>ekstra 30 dakika</strong> daha bekleyebilir. Bu hizmetin ücreti <strong>€10 / £10 / $10</strong>’dur.</li>
    <li>Bu ek sürede de dışarı çıkmazsanız, şoför ayrılacak ve rezervasyon <strong>“gelmedi” (no-show)</strong> olarak işaretlenecektir.</li>
  </ul>

  <h4>Örnek:</h4>
  <p>Uçağınız <strong>10:00</strong>’da iniyorsa ve karşılama saatini <strong>inişten 60 dakika sonra</strong> olarak belirttiyseniz, şoför <strong>11:00</strong>’de terminalde olacaktır.</p>

  <ul>
    <li>Şoför <strong>12:00</strong>’ye kadar ücretsiz olarak bekleyecektir.</li>
    <li>Dilerseniz, bu sürenin ardından şoför <strong>ek 30 dakika</strong> daha bekleyebilir. Bu hizmet <strong>€10 / £10 / $10</strong> ücretlidir.</li>
  </ul>

  <h4>Önemli:</h4>
  <ul>
    <li>APL Transfers, talep edilen karşılama saatinden itibaren <strong>60 dakikalık ücretsiz bekleme süresi</strong> sunar.</li>
    <li>Bu sürenin ötesindeki her <strong>30 dakikalık ek bekleme</strong> süresi için <strong>€10 / £10 / $10</strong> ücret alınır.</li>
  </ul>
</div>`
    ,

    ar: `<div dir="rtl" style="text-align: right;">
    <p><strong>يرجى تخصيص وقت كافٍ لإجراءات الجوازات واستلام الأمتعة.</strong> بعد وقت الاستلام المطلوب، نوفر <strong>60 دقيقة من الانتظار المجاني</strong> في المطار.</p>
  
    <p>سائقنا سيكون بانتظارك <strong>داخل صالة الوصول</strong> في نقطة الالتقاء المحددة. سيكون السائق يحمل لافتة باسم <strong>"APL Transfer"</strong> تحتوي على اسمك وسيساعدك للوصول إلى مركبتك.</p>
  
    <h3>ملاحظة خاصة لمطار إسطنبول:</h3>
    <p>في <strong>مطار إسطنبول</strong>، لدينا <strong>مكتب APL Transfers داخل صالة الوصول</strong> لمساعدتك في جميع الاستقبالات، بما في ذلك الرحلات المبكرة أو المتأخرة.</p>
  
    <p>إذا أدركت أنك لن تتمكن من مقابلة السائق خلال 60 دقيقة من وقت الانتظار المجاني، يرجى الاتصال بنا.</p>
  
    <ul>
      <li>بناءً على طلبك، يمكننا إبقاء السائق لمدة <strong>30 دقيقة إضافية</strong> مقابل رسوم <strong>€10 / £10 / $10</strong>.</li>
      <li>إذا لم تكن قد خرجت حتى بعد هذه الفترة الإضافية، سيغادر السائق وسيتم اعتبار الحجز <strong>عدم حضور (no-show)</strong>.</li>
    </ul>
  
    <h4>مثال:</h4>
    <p>إذا وصلت رحلتك في الساعة <strong>10:00 صباحًا</strong> وطلبت وقت الاستلام بعد <strong>60 دقيقة من هبوط الطائرة</strong>، سيكون السائق في المحطة في الساعة <strong>11:00 صباحًا</strong>.</p>
  
    <ul>
      <li>سينتظر السائق حتى <strong>12:00 ظهرًا</strong> دون أي رسوم إضافية.</li>
      <li>بعد ذلك، إذا طلبت، يمكن للسائق الانتظار لمدة <strong>30 دقيقة إضافية</strong> مقابل <strong>€10 / £10 / $10</strong>.</li>
    </ul>
  
    <h4>هام:</h4>
    <ul>
      <li>تقدم APL Transfers <strong>60 دقيقة من الانتظار المجاني</strong> من وقت الاستلام المطلوب.</li>
      <li>أي وقت انتظار إضافي بعد ذلك يتم تحصيله بمبلغ <strong>€10 / £10 / $10 لكل 30 دقيقة</strong>.</li>
    </ul>
  </div>`
    ,
    es: `<div>
    <p><strong>Por favor, deje tiempo suficiente para pasar inmigración y recoger su equipaje.</strong> Después de la hora de recogida solicitada, ofrecemos <strong>60 minutos de tiempo de espera GRATUITO</strong> en el aeropuerto.</p>
  
    <p>El conductor le estará esperando <strong>dentro de la sala de llegadas</strong> en el punto de recogida designado. Llevará un cartel con el nombre <strong>“APL Transfer”</strong> con su nombre y le asistirá hasta su vehículo.</p>
  
    <h3>Nota especial para el Aeropuerto de Estambul:</h3>
    <p>En el <strong>Aeropuerto de Estambul</strong>, contamos con una <strong>oficina de APL Transfers dentro de la sala de llegadas</strong> para ayudar con todas las recogidas, incluidas llegadas anticipadas o retrasadas.</p>
  
    <p>Si se da cuenta de que no podrá encontrarse con el conductor dentro de los 60 minutos de espera gratuita, por favor contáctenos.</p>
  
    <ul>
      <li>A petición suya, podemos retener al conductor <strong>30 minutos adicionales</strong> con un coste de <strong>€10 / £10 / $10</strong>.</li>
      <li>Si aún no ha salido durante este periodo adicional, el conductor se retirará y la reserva se marcará como <strong>ausencia (no-show)</strong>.</li>
    </ul>
  
    <h4>Ejemplo:</h4>
    <p>Si su vuelo aterriza a las <strong>10:00 AM</strong> y ha solicitado su recogida para <strong>60 minutos después del aterrizaje</strong>, nuestro conductor estará en la terminal a las <strong>11:00 AM</strong>.</p>
  
    <ul>
      <li>El conductor esperará hasta las <strong>12:00 PM</strong> sin costo adicional.</li>
      <li>Después de eso, si lo solicita, el conductor podrá esperar <strong>30 minutos adicionales</strong> por un coste de <strong>€10 / £10 / $10</strong>.</li>
    </ul>
  
    <h4>Importante:</h4>
    <ul>
      <li>APL Transfers proporciona <strong>60 minutos de espera gratuita</strong> desde la hora de recogida solicitada.</li>
      <li>Cualquier tiempo adicional de espera será cobrado a razón de <strong>€10 / £10 / $10 por cada 30 minutos</strong>.</li>
    </ul>
  </div>`
    ,

    it: `<div>
    <p><strong>Si prega di considerare il tempo necessario per il controllo passaporti e il ritiro dei bagagli.</strong> Dopo l'orario di ritiro richiesto, offriamo <strong>60 minuti di attesa GRATUITA</strong> in aeroporto.</p>
  
    <p>Il nostro autista ti aspetterà <strong>all'interno della sala arrivi</strong> nel punto di incontro designato. Avrà in mano un cartello con scritto <strong>"APL Transfer"</strong> con il tuo nome e ti assisterà fino al veicolo.</p>
  
    <h3>Nota speciale per l'Aeroporto di Istanbul:</h3>
    <p>Presso l'<strong>Aeroporto di Istanbul</strong>, disponiamo di un <strong>ufficio APL Transfers all'interno della sala arrivi</strong> per assistere con tutti i ritiri, inclusi gli arrivi anticipati o ritardati.</p>
  
    <p>Se ti rendi conto che non riuscirai a incontrare l'autista entro i 60 minuti di attesa gratuita, ti preghiamo di contattarci.</p>
  
    <ul>
      <li>Su richiesta, possiamo trattenere l'autista per <strong>altri 30 minuti</strong> con un costo di <strong>€10 / £10 / $10</strong>.</li>
      <li>Se non esci nemmeno durante questo periodo aggiuntivo, l'autista se ne andrà e la prenotazione verrà segnata come <strong>mancata presentazione (no-show)</strong>.</li>
    </ul>
  
    <h4>Esempio:</h4>
    <p>Se il tuo volo atterra alle <strong>10:00</strong> e hai richiesto il ritiro <strong>60 minuti dopo l'atterraggio</strong>, il nostro autista sarà in aeroporto alle <strong>11:00</strong>.</p>
  
    <ul>
      <li>L'autista attenderà fino alle <strong>12:00</strong> gratuitamente.</li>
      <li>Dopo, se lo richiedi, potrà aspettare <strong>altri 30 minuti</strong> con un costo di <strong>€10 / £10 / $10</strong>.</li>
    </ul>
  
    <h4>Importante:</h4>
    <ul>
      <li>APL Transfers offre <strong>60 minuti di attesa gratuita</strong> a partire dall'orario di ritiro richiesto.</li>
      <li>Ogni ulteriore attesa oltre tale periodo sarà addebitata al costo di <strong>€10 / £10 / $10 per ogni 30 minuti</strong>.</li>
    </ul>
  </div>`
  ,

  ru: `<div>
  <p><strong>Пожалуйста, заранее учитывайте время на прохождение паспортного контроля и получение багажа.</strong> После запрошенного времени встречи мы предоставляем <strong>60 минут бесплатного ожидания</strong> в аэропорту.</p>

  <p>Наш водитель будет ждать вас <strong>внутри зала прилёта</strong> в назначенном месте встречи. Он будет держать табличку с надписью <strong>“APL Transfer”</strong> и вашим именем и сопроводит вас к автомобилю.</p>

  <h3>Особое примечание для аэропорта Стамбула:</h3>
  <p>В <strong>аэропорту Стамбула</strong> у нас есть <strong>офис APL Transfers внутри зала прилёта</strong> для помощи при всех трансферах, включая ранние и задержанные рейсы.</p>

  <p>Если вы понимаете, что не сможете встретиться с водителем в течение 60 минут бесплатного ожидания, пожалуйста, свяжитесь с нами.</p>

  <ul>
    <li>По вашему запросу мы можем задержать водителя <strong>ещё на 30 минут</strong> за дополнительную плату <strong>€10 / £10 / $10</strong>.</li>
    <li>Если вы не появитесь и в течение этого дополнительного времени, водитель уедет, а заказ будет отмечен как <strong>неявка (no-show)</strong>.</li>
  </ul>

  <h4>Пример:</h4>
  <p>Если ваш рейс прибывает в <strong>10:00</strong>, и вы указали время встречи <strong>через 60 минут после посадки</strong>, водитель будет в терминале в <strong>11:00</strong>.</p>

  <ul>
    <li>Водитель будет ждать до <strong>12:00</strong> бесплатно.</li>
    <li>После этого, по вашему запросу, он может подождать <strong>ещё 30 минут</strong> за дополнительную плату <strong>€10 / £10 / $10</strong>.</li>
  </ul>

  <h4>Важно:</h4>
  <ul>
    <li>APL Transfers предоставляет <strong>60 минут бесплатного ожидания</strong> с момента запрошенного времени встречи.</li>
    <li>Любое дополнительное ожидание сверх этого времени оплачивается из расчёта <strong>€10 / £10 / $10 за каждые 30 минут</strong>.</li>
  </ul>
</div>`
,

zh: `<div>
  <p><strong>请预留充足的时间办理入境和领取行李手续。</strong> 在您所选择的接车时间之后，我们在机场提供 <strong>60 分钟的免费等待时间</strong>。</p>

  <p>我们的司机将在 <strong>到达大厅内</strong> 的指定接车点等候您。他将举着一块写有您名字的 <strong>“APL Transfer”</strong> 接机牌，并协助您前往车辆。</p>

  <h3>伊斯坦布尔机场特别提示：</h3>
  <p>在 <strong>伊斯坦布尔机场</strong>，我们在到达大厅内设有 <strong>APL Transfers 办公室</strong>，可协助处理所有接机，包括提前或延误抵达的航班。</p>

  <p>如果您意识到无法在这 60 分钟的免费等待时间内与司机会合，请及时与我们联系。</p>

  <ul>
    <li>根据您的请求，我们可以额外等待 <strong>30 分钟</strong>，收费为 <strong>€10 / £10 / $10</strong>。</li>
    <li>如果在延长时间内仍未出现，司机将离开，订单将被标记为 <strong>未到（no-show）</strong>。</li>
  </ul>

  <h4>示例：</h4>
  <p>如果您的航班在 <strong>上午 10:00</strong> 降落，您要求的接车时间是 <strong>航班降落后 60 分钟</strong>，那么我们的司机将在 <strong>上午 11:00</strong> 到达大厅。</p>

  <ul>
    <li>司机将免费等候至 <strong>中午 12:00</strong>。</li>
    <li>之后，如您请求，司机可以再额外等 <strong>30 分钟</strong>，费用为 <strong>€10 / £10 / $10</strong>。</li>
  </ul>

  <h4>重要提示：</h4>
  <ul>
    <li>APL Transfers 从您所选择的接车时间起，提供 <strong>60 分钟的免费等待时间</strong>。</li>
    <li>超出此时间的等待，将按每 <strong>30 分钟 €10 / £10 / $10</strong> 收取。</li>
  </ul>
</div>`

};

const FlightWaitingTimeContent = () => {

    let state = useSelector((state) => state.pickUpDropOffActions)
    let { params: { language, } } = state
    const [content, setContent] = useState(translateDatas[language])
    useEffect(() => {
        setContent(translateDatas[language]);
    }, [language])

    return (
        <div className={styles.module_content} id="id" dangerouslySetInnerHTML={{ __html: content }} />
    )
}

export default FlightWaitingTimeContent