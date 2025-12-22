import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Send, Loader2, User, Mail, Phone, Briefcase, GraduationCap, 
  Check, ChevronLeft, ChevronRight, Camera, FileText, Award, 
  Upload, Image as ImageIcon, MapPin
} from 'lucide-react'

// Nepal data from your provided structure
const nepalData = {
  "1": { // Koshi Province
    "Taplejung": ["Phungling Municipality", "Sidingba Rural Municipality", "Meringden Rural Municipality", "Maiwakhola Rural Municipality", "Phaktanglung Rural Municipality", "Sirijangha Rural Municipality", "Mikwakhola Rural Municipality", "Aathrai Tribeni Rural Municipality", "Pathivara Yangwarak Rural Municipality"],
    "Sankhuwasabha": ["Khandbari Municipality", "Chainpur Municipality", "Dharmadevi Municipality", "Panchakhapan Municipality", "Madi Municipality", "Makalu Rural Municipality", "Chichila Rural Municipality", "Silichong Rural Municipality", "Bhotkhola Rural Municipality", "Sabhapokhari Rural Municipality"],
    "Solukhumbu": ["Solududhakunda Municipality", "Sotang Rural Municipality", "Mahakulung Rural Municipality", "Likhupike Rural Municipality", "Nechasalyan Rural Municipality", "Thulung Dudhkoshi Rural Municipality", "Maapya Dudhkoshi Rural Municipality", "Khumbupasanglahmu Rural Municipality"],
    "Okhaldhunga": ["Siddhicharan Municipality", "Likhu Rural Municipality", "Molung Rural Municipality", "Sunkoshi Rural Municipality", "Champadevi Rural Municipality", "Chisankhugadhi Rural Municipality", "Khijidemba Rural Municipality", "Manebhanjyang Rural Municipality"],
    "Khotang": ["Diktel Rupakot Majhuwagadhi Municipality", "Halesi Tuwachung Municipality", "Sakela Rural Municipality", "Khotehang Rural Municipality", "Barahapokhari Rural Municipality", "Ainselukhark Rural Municipality", "Rawa Besi Rural Municipality", "Kepilasagadhi Rural Municipality", "Jantedhunga Rural Municipality", "Diprung Chuichumma Rural Municipality"],
    "Bhojpur": ["Bhojpur Municipality", "Shadananda Municipality", "Arun Rural Municipality", "Aamchowk Rural Municipality", "Hatuwagadhi Rural Municipality", "Pauwadungma Rural Municipality", "Temkemaiyung Rural Municipality", "Salpasilichho Rural Municipality", "Ramprasad Rai Rural Municipality"],
    "Dhankuta": ["Dhankuta Municipality", "Mahalaxmi Municipality", "Pakhribas Municipality", "Chaubise Rural Municipality", "Shahidbhumi Rural Municipality", "Sangurigadhi Rural Municipality", "Chhathar Jorpati Rural Municipality"],
    "Terhathum": ["Myanglung Municipality", "Laligurans Municipality", "Chhathar Rural Municipality", "Phedap Rural Municipality", "Aathrai Rural Municipality", "Menchayam Rural Municipality"],
    "Panchthar": ["Phidim Municipality", "Yangwarak Rural Municipality", "Hilihang Rural Municipality", "Falelung Rural Municipality", "Tumbewa Rural Municipality", "Kummayak Rural Municipality", "Miklajung Rural Municipality", "Falgunanda Rural Municipality"],
    "Ilam": ["Ilam Municipality", "Deumai Municipality", "Mai Municipality", "Suryodaya Municipality", "Rong Rural Municipality", "Mangsebung Rural Municipality", "Chulachuli Rural Municipality", "Sandakpur Rural Municipality", "Fakphokthum Rural Municipality", "Maijogmai Rural Municipality"],
    "Jhapa": ["Birtamod Municipality", "Damak Municipality", "Mechinagar Municipality", "Kankai Municipality", "Bhadrapur Municipality", "Arjundhara Municipality", "Gauradhaha Municipality", "Shivasataxi Municipality", "Kamal Rural Municipality", "Jhapa Rural Municipality", "Kachankawal Rural Municipality", "Gauriganj Rural Municipality", "Barhadashi Rural Municipality", "Haldibari Rural Municipality", "Buddhashanti Rural Municipality"],
    "Morang": ["Biratnagar Metropolitan City", "Letang Municipality", "Sunwarshi Municipality", "Rangeli Municipality", "Patahrishanishchare Municipality", "Uralabari Municipality", "Belbari Municipality", "Sundarharaicha Municipality", "Ratuwamai Municipality", "Jahada Rural Municipality", "Katahari Rural Municipality", "Gramthan Rural Municipality", "Dhanpalthan Rural Municipality", "Kerabari Rural Municipality", "Budhiganga Rural Municipality", "Kanepokhari Rural Municipality", "Miklajung Rural Municipality"],
    "Sunsari": ["Itahari Sub-Metropolitan City", "Dharan Sub-Metropolitan City", "Inaruwa Municipality", "Duhabi Municipality", "Ramdhuni Municipality", "Barahchhetra Municipality", "Gadhi Rural Municipality", "Koshi Rural Municipality", "Barju Rural Municipality", "Harinagar Rural Municipality", "Dewanganj Rural Municipality", "Bhokraha Narsing Rural Municipality"],
    "Udayapur": ["Triyuga Municipality", "Katari Municipality", "Chaudandigadhi Municipality", "Belaka Municipality", "Tapli Rural Municipality", "Rautamai Rural Municipality", "Udayapurgadhi Rural Municipality", "Limchungbung Rural Municipality"]
  },
  "2": { // Madhesh Province
    "Saptari": ["Rajbiraj Municipality", "Hanumannagar Kankalini Municipality", "Kanchanrup Municipality", "Khadak Municipality", "Dakneshwori Municipality", "Saptakoshi Municipality", "Surunga Municipality", "Shambhunath Municipality", "Bode Barsain Municipality", "Rajgadh Rural Municipality", "Rupani Rural Municipality", "Tirahut Rural Municipality", "Mahadeva Rural Municipality", "Bishnupur Rural Municipality", "Chhinnamasta Rural Municipality", "Balan Bihul Rural Municipality", "Tilathi Koiladi Rural Municipality", "Agnisair Krishna Savaran Rural Municipality"],
    "Siraha": ["Lahan Municipality", "Siraha Municipality", "Dhangadhimai Municipality", "Mirchaiya Municipality", "Kalyanpur Municipality", "Karjanha Municipality", "Golbazar Municipality", "Sukhipur Municipality", "Aurahi Rural Municipality", "Naraha Rural Municipality", "Arnama Rural Municipality", "Bhagawanpur Rural Municipality", "Nawarajpur Rural Municipality", "Bishnupur Rural Municipality", "Bariyarpatti Rural Municipality", "Laxmipur Patari Rural Municipality", "Sakhuwanankarkatti Rural Municipality"],
    "Dhanusa": ["Janakpurdham Sub-Metropolitan City", "Mithila Bihari Municipality", "Kamala Municipality", "Nagarain Municipality", "Ganeshman Charnath Municipality", "Mithila Municipality", "Dhanusadham Municipality", "Bideha Municipality", "Sabaila Municipality", "Hansapur Municipality", "Sahidnagar Municipality", "Chhireshwornath Municipality", "Aaurahi Rural Municipality", "Dhanauji Rural Municipality", "Bateshwor Rural Municipality", "Janaknandini Rural Municipality", "Lakshminiya Rural Municipality", "Mukhiyapatti Musarmiya Rural Municipality"],
    "Mahottari": ["Bardibas Municipality", "Gaushala Municipality", "Jaleswor Municipality", "Balwa Municipality", "Manra Siswa Municipality", "Matihani Municipality", "Ramgopalpur Municipality", "Loharpatti Municipality", "Aurahi Municipality", "Bhangaha Municipality", "Pipra Rural Municipality", "Sonama Rural Municipality", "Samsi Rural Municipality", "Ekdanra Rural Municipality", "Mahottari Rural Municipality"],
    "Sarlahi": ["Malangawa Municipality", "Hariwan Municipality", "Lalbandi Municipality", "Bagmati Municipality", "Ishworpur Municipality", "Haripur Municipality", "Barahathawa Municipality", "Balara Municipality", "Kabilasi Municipality", "Haripurwa Municipality", "Godaita Municipality", "Dhankaul Rural Municipality", "Parsa Rural Municipality", "Bishnu Rural Municipality", "Ramnagar Rural Municipality", "Kaudena Rural Municipality", "Basbariya Rural Municipality", "Chandranagar Rural Municipality", "Chakraghatta Rural Municipality", "Bramhapuri Rural Municipality"],
    "Rautahat": ["Gaur Municipality", "Chandrapur Municipality", "Garuda Municipality", "Brindaban Municipality", "Rajpur Municipality", "Rajdevi Municipality", "Gadhimai Municipality", "Madhav Narayan Municipality", "Gujara Municipality", "Katahariya Municipality", "Maulapur Municipality", "Dewahhi Gonahi Municipality", "Baudhimai Municipality", "Paroha Municipality", "Phatuwa Bijayapur Municipality", "Ishanath Municipality", "Yemunamai Rural Municipality", "Durga Bhagwati Rural Municipality"],
    "Bara": ["Birgunj Metropolitan City", "Jitpur Simara Sub-Metropolitan City", "Kalaiya Sub-Metropolitan City", "Nijgadh Municipality", "Kolhabi Municipality", "Simraungadh Municipality", "Mahagadhimai Municipality", "Pacharauta Municipality", "Pheta Rural Municipality", "Devtal Rural Municipality", "Prasauni Rural Municipality", "Suwarna Rural Municipality", "Baragadhi Rural Municipality", "Karaiyamai Rural Municipality", "Parwanipur Rural Municipality", "Bishrampur Rural Municipality", "Adarshkotwal Rural Municipality"],
    "Parsa": ["Birgunj Metropolitan City", "Bahudaramai Municipality", "Pokhariya Municipality", "Parsagadhi Municipality", "Thori Rural Municipality", "Dhobini Rural Municipality", "Chhipaharmai Rural Municipality", "Jirabhawani Rural Municipality", "Jagarnathpur Rural Municipality", "Kalikamai Rural Municipality", "Bindabasini Rural Municipality", "Pakahamainpur Rural Municipality", "SakhuwaPrasauni Rural Municipality", "Paterwasugauli Rural Municipality"]
  },
  "3": { // Bagmati Province
    "Dolakha": ["Bhimeshwor Municipality", "Jiri Municipality", "Bigu Rural Municipality", "Sailung Rural Municipality", "Melung Rural Municipality", "Baiteshwor Rural Municipality", "Tamakoshi Rural Municipality", "Gaurishankar Rural Municipality", "Kalinchok Rural Municipality"],
    "Sindhupalchok": ["Chautara SangachokGadhi Municipality", "Barhabise Municipality", "Melamchi Municipality", "Jugal Rural Municipality", "Balefi Rural Municipality", "Sunkoshi Rural Municipality", "Helambu Rural Municipality", "Bhotekoshi Rural Municipality", "Lisangkhu Pakhar Rural Municipality", "Indrawati Rural Municipality", "Tripurasundari Rural Municipality", "Panchpokhari Thangpal Rural Municipality"],
    "Rasuwa": ["Kalika Rural Municipality", "Naukunda Rural Municipality", "Uttargaya Rural Municipality", "Gosaikunda Rural Municipality", "Amachodingmo Rural Municipality"],
    "Dhading": ["Nilakantha Municipality", "Dhunibesi Municipality", "Gajuri Rural Municipality", "Galchi Rural Municipality", "Thakre Rural Municipality", "Siddhalek Rural Municipality", "Khaniyabash Rural Municipality", "Jwalamukhi Rural Municipality", "Gangajamuna Rural Municipality", "Rubi Valley Rural Municipality", "Tripura Sundari Rural Municipality", "Netrawati Dabjong Rural Municipality", "Benighat Rorang Rural Municipality"],
    "Nuwakot": ["Bidur Municipality", "Belkotgadhi Municipality", "Kakani Rural Municipality", "Tadi Rural Municipality", "Likhu Rural Municipality", "Myagang Rural Municipality", "Shivapuri Rural Municipality", "Kispang Rural Municipality", "Suryagadhi Rural Municipality", "Tarkeshwar Rural Municipality", "Panchakanya Rural Municipality", "Dupcheshwar Rural Municipality"],
    "Kathmandu": ["Kathmandu Metropolitan City", "Kirtipur Municipality", "Shankharapur Municipality", "Nagarjun Municipality", "Kageshwori Manahora Municipality", "Dakshinkali Municipality", "Budhanilakantha Municipality", "Tarakeshwor Municipality", "Tokha Municipality", "Chandragiri Municipality", "Gokarneshwor Municipality"],
    "Bhaktapur": ["Bhaktapur Municipality", "Changunarayan Municipality", "Suryabinayak Municipality", "Madhyapur Thimi Municipality"],
    "Lalitpur": ["Lalitpur Metropolitan City", "Mahalaxmi Municipality", "Godawari Municipality", "Bagmati Rural Municipality", "Mahankal Rural Municipality", "Konjyosom Rural Municipality"],
    "Kavrepalanchok": ["Dhulikhel Municipality", "Banepa Municipality", "Panauti Municipality", "Namobuddha Municipality", "Mandandeupur Municipality", "Panchkhal Municipality", "Roshi Rural Municipality", "Temal Rural Municipality", "Bhumlu Rural Municipality", "Mahabharat Rural Municipality", "Bethanchowk Rural Municipality", "Khanikhola Rural Municipality", "Chaurideurali Rural Municipality"],
    "Ramechhap": ["Manthali Municipality", "Ramechhap Municipality", "Sunapati Rural Municipality", "Doramba Rural Municipality", "Umakunda Rural Municipality", "Khadadevi Rural Municipality", "Gokulganga Rural Municipality", "Likhu Tamakoshi Rural Municipality"],
    "Sindhuli": ["Kamalamai Municipality", "Dudhouli Municipality", "Marin Rural Municipality", "Phikkal Rural Municipality", "Tinpatan Rural Municipality", "Sunkoshi Rural Municipality", "Golanjor Rural Municipality", "Ghanglekh Rural Municipality", "Hariharpurgadhi Rural Municipality"],
    "Makwanpur": ["Hetauda Sub-Metropolitan City", "Thaha Municipality", "Bakaiya Rural Municipality", "Kailash Rural Municipality", "Manahari Rural Municipality", "Bhimphedi Rural Municipality", "Bagmati Rural Municipality", "Raksirang Rural Municipality", "Makawanpurgadhi Rural Municipality", "Indrasarowar Rural Municipality"],
    "Chitawan": ["Bharatpur Metropolitan City", "Ratnanagar Municipality", "Kalika Municipality", "Khairahani Municipality", "Madi Municipality", "Rapti Municipality", "Ichchhyakamana Rural Municipality"]
  },
  "4": { // Gandaki Province
    "Gorkha": ["Gorkha Municipality", "Palungtar Municipality", "Gandaki Rural Municipality", "Dharche Rural Municipality", "Aarughat Rural Municipality", "Ajirkot Rural Municipality", "Sahid Lakhan Rural Municipality", "Siranchok Rural Municipality", "Bhimsenthapa Rural Municipality", "Chum Nubri Rural Municipality", "Barpak Sulikot Rural Municipality"],
    "Manang": ["Chame Rural Municipality", "Narshon Rural Municipality", "Narpa Bhumi Rural Municipality", "Manang Ingshyang Rural Municipality"],
    "Mustang": ["Thasang Rural Municipality", "Gharapjhong Rural Municipality", "Lomanthang Rural Municipality", "Lo-Ghekar Damodarkunda Rural Municipality", "Waragung Muktikhsetra Rural Municipality"],
    "Myagdi": ["Beni Municipality", "Mangala Rural Municipality", "Malika Rural Municipality", "Raghuganga Rural Municipality", "Dhaulagiri Rural Municipality", "Annapurna Rural Municipality"],
    "Kaski": ["Pokhara Metropolitan City", "Rupa Rural Municipality", "Madi Rural Municipality", "Annapurna Rural Municipality", "Machhapuchchhre Rural Municipality"],
    "Lamjung": ["Besishahar Municipality", "Sundarbazar Municipality", "Rainas Municipality", "MadhyaNepal Municipality", "Dordi Rural Municipality", "Dudhpokhari Rural Municipality", "Marsyangdi Rural Municipality", "Kwholasothar Rural Municipality"],
    "Tanahu": ["Byas Municipality", "Bhanu Municipality", "Bhimad Municipality", "Shuklagandaki Municipality", "Ghiring Rural Municipality", "Devghat Rural Municipality", "Rhishing Rural Municipality", "Myagde Rural Municipality", "Bandipur Rural Municipality", "Anbukhaireni Rural Municipality"],
    "Nawalparasi East": ["Kawasoti Municipality", "Madhyabindu Municipality", "Devchuli Municipality", "Gaidakot Municipality", "Baudeekali Rural Municipality", "Bulingtar Rural Municipality", "Hupsekot Rural Municipality", "Binayee Tribeni Rural Municipality"],
    "Syangja": ["Putalibazar Municipality", "Waling Municipality", "Galyang Municipality", "Bhirkot Municipality", "Chapakot Municipality", "Harinas Rural Municipality", "Biruwa Rural Municipality", "Aandhikhola Rural Municipality", "Phedikhola Rural Municipality", "Kaligandagi Rural Municipality", "Arjunchaupari Rural Municipality"],
    "Parbat": ["Kushma Municipality", "Phalebas Municipality", "Modi Rural Municipality", "Painyu Rural Municipality", "Jaljala Rural Municipality", "Bihadi Rural Municipality", "Mahashila Rural Municipality"],
    "Baglung": ["Baglung Municipality", "Jaimuni Municipality", "Galkot Municipality", "Dhorpatan Municipality", "Bareng Rural Municipality", "Badigad Rural Municipality", "Nisikhola Rural Municipality", "Kanthekhola Rural Municipality", "Tara Khola Rural Municipality", "Taman Khola Rural Municipality"]
  },
  "5": { // Lumbini Province
    "Rukum East": ["Bhume Rural Municipality", "Sisne Rural Municipality", "Putha Uttarganga Rural Municipality"],
    "Rolpa": ["Rolpa Municipality", "Madi Rural Municipality", "Thawang Rural Municipality", "Sunchhahari Rural Municipality", "Lungri Rural Municipality", "Gangadev Rural Municipality", "Tribeni Rural Municipality", "Pariwartan Rural Municipality", "Runtigadi Rural Municipality", "Sunil Smriti Rural Municipality"],
    "Pyuthan": ["Pyuthan Municipality", "Sworgadwary Municipality", "Ayirabati Rural Municipality", "Gaumukhi Rural Municipality", "Jhimruk Rural Municipality", "Naubahini Rural Municipality", "Mandavi Rural Municipality", "Mallarani Rural Municipality", "Sarumarani Rural Municipality"],
    "Gulmi": ["Resunga Municipality", "Musikot Municipality", "Ruru Rural Municipality", "Isma Rural Municipality", "Madane Rural Municipality", "Malika Rural Municipality", "Chatrakot Rural Municipality", "Dhurkot Rural Municipality", "Satyawati Rural Municipality", "Chandrakot Rural Municipality", "Kaligandaki Rural Municipality", "Gulmidarbar Rural Municipality"],
    "Arghakhanchi": ["Sandhikharka Municipality", "Bhumekasthan Municipality", "Sitganga Municipality", "Panini Rural Municipality", "Chhatradev Rural Municipality", "Malarani Rural Municipality"],
    "Palpa": ["Tansen Municipality", "Rampur Municipality", "Rambha Rural Municipality", "Tinau Rural Municipality", "Nisdi Rural Municipality", "Mathagadhi Rural Municipality", "Ribdikot Rural Municipality", "Purbakhola Rural Municipality", "Bagnaskali Rural Municipality", "Rainadevi Chhahara Rural Municipality"],
    "Nawalparasi West": ["Ramgram Municipality", "Bardaghat Municipality", "Sunwal Municipality", "Sarawal Rural Municipality", "Susta Rural Municipality", "Pratappur Rural Municipality", "Palhi Nandan Rural Municipality"],
    "Rupandehi": ["Butwal Sub-Metropolitan City", "Siddharthanagar Municipality", "Lumbini Sanskritik Municipality", "Sainamaina Municipality", "Devdaha Municipality", "Tillotama Municipality", "Kanchan Rural Municipality", "Siyari Rural Municipality", "Rohini Rural Municipality", "Gaidahawa Rural Municipality", "Omsatiya Rural Municipality", "Sudhdhodhan Rural Municipality", "Mayadevi Rural Municipality", "Marchawari Rural Municipality", "Kotahimai Rural Municipality", "Sammarimai Rural Municipality"],
    "Kapilbastu": ["Kapilbastu Municipality", "Shivaraj Municipality", "Buddhabhumi Municipality", "Maharajgunj Municipality", "Banganga Municipality", "Krishnanagar Municipality", "Yashodhara Rural Municipality", "Bijayanagar Rural Municipality", "Mayadevi Rural Municipality", "Suddhodhan Rural Municipality"],
    "Dang": ["Ghorahi Sub-Metropolitan City", "Tulsipur Sub-Metropolitan City", "Lamahi Municipality", "Babai Rural Municipality", "Gadhawa Rural Municipality", "Rapti Rural Municipality", "Rajpur Rural Municipality", "Dangisharan Rural Municipality", "Shantinagar Rural Municipality", "Banglachuli Rural Municipality"],
    "Banke": ["Nepalgunj Sub-Metropolitan City", "Kohalpur Municipality", "Khajura Rural Municipality", "Janki Rural Municipality", "Baijanath Rural Municipality", "Duduwa Rural Municipality", "Narainapur Rural Municipality", "Rapti Sonari Rural Municipality"],
    "Bardiya": ["Gulariya Municipality", "Rajapur Municipality", "Madhuwan Municipality", "Thakurbaba Municipality", "Bansagadhi Municipality", "Barbardiya Municipality", "Geruwa Rural Municipality", "Badhaiyatal Rural Municipality"]
  },
  "6": { // Karnali Province
    "Dolpa": ["Thuli Bheri Municipality", "Tripurasundari Municipality", "Kaike Rural Municipality", "Jagadulla Rural Municipality", "Mudkechula Rural Municipality", "Dolpo Buddha Rural Municipality", "Shey Phoksundo Rural Municipality", "Chharka Tangsong Rural Municipality"],
    "Mugu": ["Chhayanath Rara Municipality", "Soru Rural Municipality", "Khatyad Rural Municipality", "Mugum Karmarong Rural Municipality"],
    "Humla": ["Simkot Rural Municipality", "Namkha Rural Municipality", "Chankheli Rural Municipality", "Tanjakot Rural Municipality", "Sarkegad Rural Municipality", "Adanchuli Rural Municipality", "Kharpunath Rural Municipality"],
    "Jumla": ["Chandannath Municipality", "Hima Rural Municipality", "Tila Rural Municipality", "Sinja Rural Municipality", "Guthichaur Rural Municipality", "Tatopani Rural Municipality", "Patrasi Rural Municipality", "Kanakasundari Rural Municipality"],
    "Kalikot": ["Khandachakra Municipality", "Raskot Municipality", "Tilagufa Municipality", "Mahawai Rural Municipality", "Palata Rural Municipality", "Naraharinath Rural Municipality", "Pachaljharana Rural Municipality", "Subha Kalika Rural Municipality", "Sanni Tribeni Rural Municipality"],
    "Dailekh": ["Narayan Municipality", "Dullu Municipality", "Aathabis Municipality", "Chamunda Bindrasaini Municipality", "Bhairabi Rural Municipality", "Mahabu Rural Municipality", "Gurans Rural Municipality", "Naumule Rural Municipality", "Bhagawatimai Rural Municipality", "Thantikandh Rural Municipality", "Dungeshwor Rural Municipality"],
    "Jajarkot": ["Nalagad Municipality", "Bheri Municipality", "Chhedagad Municipality", "Kuse Rural Municipality", "Shiwalaya Rural Municipality", "Barekot Rural Municipality", "Junichande Rural Municipality"],
    "Rukum West": ["Musikot Municipality", "Aathbiskot Municipality", "Chaurjahari Municipality", "Tribeni Rural Municipality", "Sani Bheri Rural Municipality", "Banfikot Rural Municipality"],
    "Salyan": ["Sharada Municipality", "Bagchaur Municipality", "Bangad Kupinde Municipality", "Kumakh Rural Municipality", "Darma Rural Municipality", "Kapurkot Rural Municipality", "Kalimati Rural Municipality", "Tribeni Rural Municipality", "Chhatreshwori Rural Municipality", "Siddha Kumakh Rural Municipality"],
    "Surkhet": ["Birendranagar Municipality", "Gurbhakot Municipality", "Panchpuri Municipality", "Bheriganga Municipality", "Lekbeshi Municipality", "Chaukune Rural Municipality", "Simta Rural Municipality", "Chingad Rural Municipality", "Barahtal Rural Municipality"]
  },
  "7": { // Sudurpashchim Province
    "Bajura": ["Badimalika Municipality", "Tribeni Municipality", "Budhiganga Municipality", "Budhinanda Municipality", "Gaumul Rural Municipality", "Himali Rural Municipality", "Jagannath Rural Municipality", "Khaptad Chhededaha Rural Municipality", "Swami Kartik Khaapar Rural Municipality"],
    "Bajhang": ["JayaPrithivi Municipality", "Bungal Municipality", "Masta Rural Municipality", "Thalara Rural Municipality", "Talkot Rural Municipality", "Surma Rural Municipality", "SaiPaal Rural Municipality", "Durgathali Rural Municipality", "Bithadchir Rural Municipality", "Kedarseu Rural Municipality", "Khaptadchhanna Rural Municipality", "Chabispathivera Rural Municipality"],
    "Darchula": ["Mahakali Municipality", "Shailyashikhar Municipality", "Lekam Rural Municipality", "Naugad Rural Municipality", "Byas Rural Municipality", "Dunhu Rural Municipality", "Marma Rural Municipality", "Apihimal Rural Municipality", "Malikaarjun Rural Municipality"],
    "Baitadi": ["Dasharathchanda Municipality", "Patan Municipality", "Melauli Municipality", "Purchaudi Municipality", "Sigas Rural Municipality", "Shivanath Rural Municipality", "Surnaya Rural Municipality", "Dilasaini Rural Municipality", "Pancheshwar Rural Municipality", "Dogadakedar Rural Municipality"],
    "Dadeldhura": ["Amargadhi Municipality", "Parashuram Municipality", "Alital Rural Municipality", "Ajaymeru Rural Municipality", "Bhageshwar Rural Municipality", "Nawadurga Rural Municipality", "Ganayapdhura Rural Municipality"],
    "Doti": ["Dipayal Silgadi Municipality", "Shikhar Municipality", "Sayal Rural Municipality", "Adharsha Rural Municipality", "Jorayal Rural Municipality", "Badikedar Rural Municipality", "Purbichauki Rural Municipality", "K I Singh Rural Municipality", "Bogtan Foodsil Rural Municipality"],
    "Achham": ["Sanphebagar Municipality", "Mangalsen Municipality", "Kamalbazar Municipality", "Panchadewal Binayak Municipality", "Dhakari Rural Municipality", "Mellekh Rural Municipality", "Chaurpati Rural Municipality", "Ramaroshan Rural Municipality", "Turmakhad Rural Municipality", "Bannigadhi Jayagadh Rural Municipality"],
    "Kailali": ["Dhangadhi Sub-Metropolitan City", "Tikapur Municipality", "Godawari Municipality", "Gauriganga Municipality", "Lamkichuha Municipality", "Bhajani Municipality", "Ghodaghodi Municipality", "Chure Rural Municipality", "Janaki Rural Municipality", "Kailari Rural Municipality", "Joshipur Rural Municipality", "Mohanyal Rural Municipality", "Bardagoriya Rural Municipality"],
    "Kanchanpur": ["Bhimdatta Municipality", "Punarbas Municipality", "Belauri Municipality", "Krishnapur Municipality", "Bedkot Municipality", "Shuklaphanta Municipality", "Mahakali Municipality", "Beldandi Rural Municipality", "Laljhadi Rural Municipality"]
  }
 };

const membershipTypes = [
  { id: 'intern', label: 'Intern Member', description: 'Students or freshers undergoing training' },
  { id: 'associate', label: 'Associate Member', description: 'Junior-level contributors or trainees' },
  { id: 'professional', label: 'Professional Member', description: 'Full-time developers and professionals' },
  { id: 'other', label: 'Other', description: 'Specify your interest' }
]

const skillsList = [
  'React.js', 'Node.js', 'Python', 'UI/UX Design', 'Mobile Development',
  'DevOps', 'Machine Learning', 'Project Management', 'Digital Marketing',
  'Content Writing', 'Quality Assurance', 'Business Analysis'
]

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Education & Skills', icon: GraduationCap },
  { id: 3, title: 'Membership & Photo', icon: Camera },
  { id: 4, title: 'Motivation & Links', icon: FileText },
  { id: 5, title: 'Review & Submit', icon: Award }
]

// Province names mapping
const provinceNames = {
  '1': 'Koshi Province',
  '2': 'Madhesh Province',
  '3': 'Bagmati Province',
  '4': 'Gandaki Province',
  '5': 'Lumbini Province',
  '6': 'Karnali Province',
  '7': 'Sudurpashchim Province'
}

const MembershipForm = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    province: '',
    district: '',
    municipality: '',
    address: '',
    
    // Step 2
    education: '',
    experience: '',
    skills: [],
    otherSkills: '',
    
    // Step 3
    membershipType: '',
    profilePhoto: null,
    photoPreview: '',
    
    // Step 4
    motivation: '',
    availability: '',
    linkedin: '',
    github: '',
    portfolio: '',
    
    // Additional
    resume: null
  })

  const [districts, setDistricts] = useState([])
  const [municipalities, setMunicipalities] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  // Update districts when province changes
  useEffect(() => {
  if (formData.province) {
    const provinceDistricts = Object.keys(nepalData[formData.province] || {})
    setDistricts(provinceDistricts)
    // Reset district and municipality when province changes
    setFormData(prev => ({
      ...prev,
      district: '',
      municipality: ''
    }))
    setMunicipalities([])
  } else {
    setDistricts([])
    setMunicipalities([])
  }
}, [formData.province])

  // Update municipalities when district changes
  useEffect(() => {
  if (formData.province && formData.district) {
    const districtMunicipalities = nepalData[formData.province][formData.district] || []
    setMunicipalities(districtMunicipalities)
    // Reset municipality when district changes
    setFormData(prev => ({
      ...prev,
      municipality: ''
    }))
  } else {
    setMunicipalities([])
  }
}, [formData.province, formData.district])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    
    if (type === 'file') {
      const file = files[0]
      if (file) {
        if (name === 'profilePhoto') {
          // Validate image file
          if (!file.type.startsWith('image/')) {
            setErrors(prev => ({ ...prev, profilePhoto: 'Please upload an image file' }))
            return
          }
          if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setErrors(prev => ({ ...prev, profilePhoto: 'Image size should be less than 5MB' }))
            return
          }
          
          const reader = new FileReader()
          reader.onloadend = () => {
            setFormData(prev => ({
              ...prev,
              [name]: file,
              photoPreview: reader.result
            }))
          }
          reader.readAsDataURL(file)
          
          // Clear error
          if (errors.profilePhoto) {
            setErrors(prev => ({ ...prev, profilePhoto: '' }))
          }
        } else {
          setFormData(prev => ({ ...prev, [name]: file }))
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: null,
      photoPreview: ''
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}
    
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
        if (!formData.province) newErrors.province = 'Province is required'
        if (!formData.district) newErrors.district = 'District is required'
        if (!formData.municipality) newErrors.municipality = 'Municipality is required'
        break
        
      case 2:
        if (!formData.education.trim()) newErrors.education = 'Education information is required'
        break
        
      case 3:
        if (!formData.membershipType) newErrors.membershipType = 'Please select membership type'
        if (!formData.profilePhoto) newErrors.profilePhoto = 'Profile photo is required'
        break
        
      case 4:
        if (!formData.motivation.trim()) newErrors.motivation = 'Please tell us why you want to join'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(currentStep)) return
    
    setIsSubmitting(true)
    
    try {
      const formDataToSend = new FormData()
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        if (key === 'profilePhoto' || key === 'resume') {
          if (formData[key]) {
            formDataToSend.append(key, formData[key])
          }
        } else if (Array.isArray(formData[key])) {
          formDataToSend.append(key, JSON.stringify(formData[key]))
        } else {
          formDataToSend.append(key, formData[key])
        }
      })
      
      // Add location details
      formDataToSend.append('provinceName', provinceNames[formData.province] || '')
      
      // Send to backend
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: formDataToSend
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit application')
      }
      
      const result = await response.json()
      console.log('Application submitted:', result)
      
      setIsSubmitted(true)
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          province: '',
          district: '',
          municipality: '',
          address: '',
          education: '',
          experience: '',
          skills: [],
          otherSkills: '',
          membershipType: '',
          profilePhoto: null,
          photoPreview: '',
          motivation: '',
          availability: '',
          linkedin: '',
          github: '',
          portfolio: '',
          resume: null
        })
        setCurrentStep(1)
      }, 3000)
      
    } catch (error) {
      console.error('Submission error:', error)
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <User size={24} />
                Personal Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please provide your basic information
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none`}
                  placeholder="Enter Your Full Name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none`}
                  placeholder="Enter Your Email Address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none`}
                  placeholder="Enter Your Phone Number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Province *
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.province ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none`}
                >
                  <option value="">Select Province</option>
                  {Object.keys(provinceNames).map(provinceId => (
                    <option key={provinceId} value={provinceId}>
                      {provinceNames[provinceId]}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="text-red-500 text-sm mt-1">{errors.province}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  District *
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={!formData.province}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.district ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none disabled:opacity-50`}
                >
                  <option value="">Select District</option>
                  {districts.map(district => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Municipality *
                </label>
                <select
                  name="municipality"
                  value={formData.municipality}
                  onChange={handleChange}
                  disabled={!formData.district}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.municipality ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none disabled:opacity-50`}
                >
                  <option value="">Select Municipality</option>
                  {municipalities.map(municipality => (
                    <option key={municipality} value={municipality}>
                      {municipality}
                    </option>
                  ))}
                </select>
                {errors.municipality && (
                  <p className="text-red-500 text-sm mt-1">{errors.municipality}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Address (Ward, Tole, etc.)
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Ward No., Street, Tole"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <GraduationCap size={24} />
                Education & Skills
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your background and expertise
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Education / Qualifications *
              </label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                rows="3"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.education ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none`}
                placeholder="Your educational background, degrees, certifications..."
              />
              {errors.education && (
                <p className="text-red-500 text-sm mt-1">{errors.education}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Previous Experience (if any)
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="Describe your previous work experience, projects, internships..."
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select your skills:
              </label>
              <div className="flex flex-wrap gap-2">
                {skillsList.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      formData.skills.includes(skill)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Other Skills (comma separated)
                </label>
                <input
                  type="text"
                  name="otherSkills"
                  value={formData.otherSkills}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g., Figma, AWS, MongoDB"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <Camera size={24} />
                Profile Photo
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose your membership type and upload a profile photo
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <Briefcase size={20} />
                Membership Type *
              </h4>
              {errors.membershipType && (
                <p className="text-red-500 text-sm">{errors.membershipType}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {membershipTypes.map(type => (
                  <label
                    key={type.id}
                    className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      formData.membershipType === type.id
                        ? 'border-primary bg-primary/10 dark:bg-primary/20'
                        : 'border-gray-300 dark:border-gray-700 hover:border-primary/50 bg-white dark:bg-gray-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="membershipType"
                      value={type.id}
                      checked={formData.membershipType === type.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="font-medium text-gray-900 dark:text-white">{type.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {type.description}
                    </div>
                    {formData.membershipType === type.id && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <ImageIcon size={20} />
                Profile Photo *
              </h4>
              
              <div className="space-y-4">
                {formData.photoPreview ? (
                  <div className="space-y-3">
                    <div className="relative w-32 h-32 mx-auto">
                      <img
                        src={formData.photoPreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-center text-sm text-green-600 dark:text-green-400">
                      ✓ Photo uploaded successfully
                    </p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Upload a clear profile photo (max 5MB)
                    </p>
                    <label className="cursor-pointer">
                      <div className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                        <Camera size={20} />
                        Choose Photo
                      </div>
                      <input
                        type="file"
                        name="profilePhoto"
                        onChange={handleChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                
                {errors.profilePhoto && (
                  <p className="text-red-500 text-sm text-center">{errors.profilePhoto}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Resume / CV (Optional)
                </label>
                <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
                  <label className="cursor-pointer flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-gray-400" />
                      <div>
                        <p className="text-gray-900 dark:text-white">
                          {formData.resume ? formData.resume.name : 'Upload your resume'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          PDF, DOC, DOCX (max 10MB)
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                      Browse
                    </div>
                    <input
                      type="file"
                      name="resume"
                      onChange={handleChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <FileText size={24} />
                Motivation & Links
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us why you want to join and share your online presence
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Why do you want to join Riseup-Tech? *
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows="4"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.motivation ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none`}
                placeholder="Tell us about your motivation, goals, and what you hope to achieve with Riseup-Tech..."
              />
              {errors.motivation && (
                <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Availability (Hours per week)
              </label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="e.g., 20 hours/week, Full-time, Weekends only"
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Online Profiles</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    placeholder="https://github.com/username"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Portfolio / Website
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <Award size={24} />
                Review Your Application
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please review all information before submitting
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Personal Info Summary */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Personal Information</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Name:</span>
                    <p className="font-medium">{formData.fullName || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Email:</span>
                    <p className="font-medium">{formData.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                    <p className="font-medium">{formData.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Date of Birth:</span>
                    <p className="font-medium">{formData.dateOfBirth || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Province:</span>
                    <p className="font-medium">{provinceNames[formData.province] || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">District:</span>
                    <p className="font-medium">{formData.district || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Municipality:</span>
                    <p className="font-medium">{formData.municipality || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Address:</span>
                    <p className="font-medium">{formData.address || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              {/* Education & Skills Summary */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Education & Skills</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Education:</span>
                    <p className="font-medium">{formData.education || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Experience:</span>
                    <p className="font-medium">{formData.experience || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                      {formData.otherSkills && (
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                          {formData.otherSkills}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Membership & Photo Summary */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Membership & Files</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Membership Type:</span>
                    <p className="font-medium">
                      {membershipTypes.find(t => t.id === formData.membershipType)?.label || 'Not selected'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Profile Photo:</span>
                    <p className="font-medium">
                      {formData.profilePhoto ? '✓ Uploaded' : 'Not uploaded'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Resume:</span>
                    <p className="font-medium">
                      {formData.resume ? formData.resume.name : 'Not uploaded'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Motivation & Links Summary */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Motivation & Links</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Motivation:</span>
                    <p className="font-medium">{formData.motivation || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Availability:</span>
                    <p className="font-medium">{formData.availability || 'Not specified'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">LinkedIn:</span>
                      <p className="font-medium truncate">{formData.linkedin || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">GitHub:</span>
                      <p className="font-medium truncate">{formData.github || 'Not provided'}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500 dark:text-gray-400">Portfolio:</span>
                      <p className="font-medium truncate">{formData.portfolio || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/70" onClick={onClose} />
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-green-600 dark:text-green-400" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your interest in joining Riseup-Tech. We'll review your application and get back to you soon.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
    >
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <motion.div
        initial={{ y: 20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white dark:bg-gray-900 py-2 z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Membership Application</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Step {currentStep} of {steps.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep
              
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-primary text-white scale-110' 
                      : isCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <Check size={20} />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    isActive 
                      ? 'text-primary' 
                      : isCompleted 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 mt-6 border-t border-gray-300 dark:border-gray-700">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            Step {currentStep} of {steps.length}
          </p>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default MembershipForm