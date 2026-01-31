'use server';

import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

//define server function
export async function generateResponse(input: string) {
  'use server'

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `${input}`,
  });
  console.log(response.text);

  return response.text;
}

function callSheets(): string {
  return `Category,Resource Name,Website,Contact Email,Contact phone,Location,Description,Scheduling link?,Issue Key,Key words,Link to FAQ or About Page
Academic,General Announcements (GA),https://ga.rice.edu/,,,,"Rice University's official catalog of courses, degrees, policies, and curricular requirements",,Academic Decisions,Course/degree policies and requirements,
Academic,Office of the Registrar,https://registrar.rice.edu/,registrar@rice.edu,713-348-4999,116 Allen Center,"The Office of the Registrar at Rice University supports the educational mission of the university by working with the Rice community to maintain the accuracy and integrity of its educational records, provide quality service, and support innovative systems that enhance academic support.",,Academic Decisions,"Academic Calendars
Academic Honors
Exam Credit (AP, IB, A-Level, Credit by Departmental Exam)
Graduation
Majors, Minors, and University Certificates
Summer Sessions
Transfer Credit",https://registrar.rice.edu/resources-and-help/faqs
Academic,Petitions and Special Requests,https://dou.rice.edu/student-resources/academic/petitions-special-requests,,,,"All undergraduate students are subject to the academic regulations of the university. Students are responsible for making certain they meet all departmental and university requirements and academic deadlines. Under unusual or mitigating circumstances, students may submit a written petition for consideration by the appropriate committee or office. Please see the Petitions and Special Requests website for more information about specific situations.",,Academic Challenges,,
Academic,Religious Accommodations,https://dou.rice.edu/religious-holidays,,,,"Both Rice's policy of non-discrimination on the basis of religion and our core values of diversity and inclusion require instructors to make reasonable accommodations to help students avoid negative academic consequences with their religious obligations conflict with academic requirements.

Every reasonable effort should be made to allow members of the university community to observe their religious holidays without jeopardizing the fulfillment of their academic obligations. It is never acceptable for an instructor to compel a student to choose between religious observation and academic work.

Absence from classes or examinations for religious reasons does not relieve students from responsibility for any part of the course work required during the period of the absence. It is the obligation of students to provide faculty with reasonable notice of the dates of religious holidays on which they will be absent.",,Academic Challenges,,
Academic,Office of Graduate and Postdoctoral Studies,https://graduate.rice.edu/,graduate@rice.edu,713-348-4002,"Sewall Hall, room 370","The Office of Graduate and Postdoctoral Studies is here for you! Our staff, along with your academic program administrator, will be your academic partners as you pursue your graduate degree. Our office handles thesis submission, candidacy declaration, graduate student career development, payroll and tuition, fellowship and funding guidance, community building, student support for wellbeing and academic issues, and special events. Meet our team below, view our office hours, or contact our office at (713) 348-4002 or graduate@rice.edu.",,"Academic Decisions, Academic Challenges","Graduate student, Academics, Wellness",
Academic,Office of Academic Advising (OAA),https://oaa.rice.edu,aadv@rice.edu,713-348-4060,132 Ley Student Center,"The Office of Academic Advising at Rice University strives for an unparalleled environment for undergraduates to explore opportunities, identify goals, and implement plans to reach those goals.",https://rice.navigate.eab.com/app/,"Academic Decisions, Academic Challenges","Major Advising, Academic Planning, Study Skills and Time Management",
,Peer Academic Advisors (PAAs),https://oaa.rice.edu/advising-network/peer-academic-advisors,,,,"PAAs are competitively selected and extensively trained by the Office of Academic Advising (OAA), serve their respective residential college community by providing peer advice to fellow students about a wide range of academically-related topics, have personal experience as a Rice student and offer accurate advice regarding specific courses, co-curricular opportunities, academic rules and procedures, and a wide range of other topics.",,"Academic Decisions, Academic Challenges",,
Academic,Office of Student Success Initiatives (OSSI),https://success.rice.edu/,success@rice.edu,713-348-4495,"Cloisters, Rice Memorial Center","The Office of Student Success Initiatives (SSI) engages and supports Rice undergraduate students employing proactive advising and other high engagement strategies to facilitate students’ successful transition, retention and graduation from the university.",https://rice.navigate.eab.com/app/#/,Academic Challenges,"time management, cultivating Rice-level study skills, dealing with failure, and making the social, emotional, and navigational transition to college",https://success.rice.edu/ssi-advising/our-approach
Academic,Center for Career Development (CCD),https://ccd.rice.edu/,ccd@rice.edu,713-348-4055,Huff House,"The Center for Career Development (CCD) exists to help you find and make your place in the world by educating you on knowledge of self, career options and resources, connecting you with opportunities through the global Rice network, and empowering you with skills, tools, and confidence.",https://rice.12twenty.com/appointments,Career,"Major/Career Path Exploration
Career & Internship Expos
Resumes/Correspondence
Questions about Employers
Interview Prep
Job/Internship Search
Graduate School
Networking",https://ccd.rice.edu/student-faqs
,Peer Career Advisors (PCAs),https://ccd.rice.edu/students/peer-career-advisors,,,,"Peer Career Advisors (PCAs) are a group of student volunteers who are selected through an application and interview process during each Spring semester. They serve as ambassadors to undergraduates and play a valuable role in supporting the Center for Career Development (CCD). PCAs reinforce the knowledge, skills, and resources offered through the CCD. PCAs are specially trained to assist you with the following topics:

Resume and cover letter reviews

How to use 12twenty

Internship & job search basics

Using CCD online resources (Focus2, Firsthand, etc.)

Understanding CCD services

",,Career,,
Academic,Center for Academic and Professional Communication (CAPC),https://capc.rice.edu/,capc@rice.edu,713-348-4932,"2nd Floor, Fondren Library","The Center for Academic and Professional Communication (CAPC) serves as the communication support hub of the university for any written, oral, and visual communication projects within and across disciplines. Staff and peer consultants assist undergraduates, graduates, post-docs, faculty, and staff through one-on-one consultations, workshops, and other resources. We seek to empower the entire Rice community with the skills, tools, and confidence to become effective and successful in all communicative endeavors.",https://cwovc.mywconline.com/,Academic Challenges,"written, oral, and visual communication projects",https://pwc.rice.edu/capc/about-center-academic-and-professional-communication
Academic,Center for Teaching Excellence (CTE),https://cte.rice.edu/,cte@rice.edu,713-348-2929,129 Herring Hall,The Center for Teaching Excellence (CTE) offers training for undergraduates who are serving as TAs in courses as Rice. The CTE also oversees Student-Taught Courses and teaches the pedagogy course that is required for student instructors.,,Academic Challenges,Undergraduate TAs,
Academic,Navigate,https://dou.rice.edu/student-resources/academic/navigate-rice,,,,"Navigate is an online tool to connect students to faculty, staff, and campus resources. This free app is designed to help students as they “navigate” their way through college starting with registration, meeting with advisors, scheduling classes, applying for financial aid and other tasks leading to graduation.",,"Academic Decisions, Academic Challenges",,
Academic,Rice Study Abroad,https://abroad.rice.edu/,abroad@rice.edu,713-348-5836,,"Rice Study Abroad strives to provide substantial, transformational experiences within each undergraduate’s personal curriculum through intellectually rigorous and culturally enriching international opportunities. Rice Study Abroad is committed to providing students with high quality academic programs in collaboration with prestigious international universities and select program providers. Rice-approved programs are distinguished by their academic focus contributing to the curricular needs of Rice University as well as integration with host communities through intensive language instruction, field studies, professional internships, and research opportunities.",https://abroad.rice.edu/request-advising,Academic Decisions,Study abroad,
Academic,Fondren Library,https://library.rice.edu/,ask@rice.libanswers.com,713-348-5698,,"As a campus crossroads, Fondren Library brings together the Rice community with welcoming spaces, excellent collections, and strong services in support of teaching, research and creative expression. Our eBooks, online journals, databases, and other streaming/electronic materials are available via our website. The library’s physical spaces are open only to Rice ID card holders in Fall 2020. Covid-related service changes and updates are here. Access online tutorials about Fondren’s spaces, research resources, and learning opportunities here. Contact Us for quick research or reference questions or to consult with a subject librarian.",,Academic Challenges,"Research Databases, Study Room Reservations, Scanning & Printing, Borrow Equipment, Course Materials",https://library.rice.edu/faq
Financial,Access and Opportunity Portal (AOP),https://aop.rice.edu/,aop@rice.edu,,,"All currently enrolled undergraduate students, domestic and international, who exhibit need are eligible to submit an Access and Opportunity Portal funding request. The AOP will consider requests from students experiencing financial challenges and are seeking support to allow them to participate in opportunities related to their academic, professional, social or interpersonal development. Requests for assistance are accepted on a rolling basis. Please see the AOP website for more specific information on the types of funding AOP may support.

There are three types of funding that undergraduates may request: 1) Non-Emergency funding through their Residential College Accessibility Funds, 2) Non-Emergency Funding through the Rice Access and Opportunity Portal for financial support of academic, social, and professional opportunities, and 3) Emergency Funding through the Dean of Undergraduates reserved for the most pressing and urgent needs requiring immediate action. See below for more details on each type of request.",,Finances,"Financial support for academic, career, transportation costs",https://aop.rice.edu/access-and-opportunity-portal
,Rice Mutual Aid,https://www.ricemutualaid.com/,ricemutualaid@gmail.com,,,"Rice Mutual Aid is a student-organized mutual aid network dedicated to long-term, sustainable support of Rice Owls. We seek to promote community development, organizing, and education around mutual aid. We help Rice students support other fellow students through our fund, which allows students to donate what they can and take according to their needs. Our fund and other initiatives alike help Rice grow as a community that uplifts all students, especially the most marginalized members of our community!",,Finances,Financial support for any student needs,
Financial,Office of Financial Aid,https://financialaid.rice.edu/,fina@rice.edu,713-348-4958,250 Allen Center,"We know that figuring out financial aid can be a confusing and stressful process. Don't worry - our financial aid counselors are here to help. As you navigate this process, we're available to answer any questions you may have.",https://riceadmission.rice.edu/portal/financial-aid-appt,Finances,Financial aid,
Financial,Bursar's Office,https://bursar.rice.edu/,bursar@rice.edu,713-348-4946,110 Allen Center,"The Bursar's Office can assist with learning about costs, understanding your bill, making payments, and information about refunds.",,Finances,Understanding bill and making payments,
Student Life,Office of the Dean of Undergraduates (DOU),https://dou.rice.edu/,malto:ugdean@rice.edu,713-348-4996,352 Sewall Hall,The Division of the Dean of Undergraduates (DOU) is responsible for supporting the undergraduate experience at Rice.,,All,"Directory for other resources (academics, career, wellbeing, health, experiential learning and leadership)",
Student Life,Office of International Students and Scholars (OISS),https://oiss.rice.edu/,oiss@rice.edu,713-348-6095,"Entrance A, Lovett Hall","The Office of International Students & Scholars is here to support all Rice internationals and the Academic Departments with all matters related to immigration, international compliance, and cultural adaptation.",https://oiss.rice.edu/appointment,International students,,https://oiss.rice.edu/student-FAQs
Student Life,DACA and Undocumented Students at Rice,http://daca.rice.edu/,marjorie@rice.edu,713-348-6095,"Lovett Hall, Entrance A, Second Floor",Resources and inforamtion for DACA and Undocumented Students at Rice can be found by visiting daca.rice.edu,,,"DACA, undocumented, and other resident immigrant students",https://daca.rice.edu/undocumented-students-faq
Student Life,Office of Multicultural Affairs (OMA),https://oma.rice.edu/,mino@rice.edu,713-348-5124,220 Allen Center,"The Office of Multicultural Affairs coordinates and implements educational, cultural, and social programs that empower student success and create a sense of belonging for students from historically underrepresented communities.",,Social,,https://mcc.rice.edu/services
Student Life,Housing & Dining (H&D),https://housing.rice.edu/,housing@rice.edu,,,The Department of Housing & Dining strives to make your college experience completely inviting and supportive of your life as a student at Rice University.,,Housing,On-campus/Off-campus housing,
,,https://dining.rice.edu/,dining@rice.edu,,,"For general housing inquiries, please e-mail housing@rice.edu
For general dining inquiries, please e-mail dining@rice.edu",,Dining,Meal plans,
,,https://rice.tririga.com/,work@rice.edu,,,"For work orders and service requests only, please submit a request to https://rice.tririga.com/.",,Housing,On-campus housing,
,Doerr Institute for New Leaders,https://doerr.rice.edu/,leadership@rice.edu,713-348-4391,"McNair Hall, 2nd floor, Suite 204","The Doerr Institute courses alllow students to build and develop leadership competencies and skills. They offer executive-quality leadership development, at no cost, to all Rice students, as well as individualized coaching from certified coaches with the objective of connecting Rice students with the awareness and tools that will help them find, sharpen, and grow their true leadership potential.",,,,https://doerr.rice.edu/resources/faqs
Student Life,Rice Sports,https://riceowls.com/,,,,"All current, active, full-time Rice students receive free admission to all athletic events on campus. Students can gain admission to events simply by presenting their student ID at the student gate entrance at all venues.",,,,
Student Life,Rice Memorial Center and Ley Student Center (Student Activities),http://studentcenter.rice.edu/,sact@rice.edu,713-348-4097,202 Rice Memorial Center (above Grand Hall),"The Rice Student Center provides facilities, resources, events, and services that enrich the social & educational development while allowing for the self-directed engagement of the Rice Community Members and university visitors.

Student Activities is dedicated to helping students develop as leaders and supporting them in their efforts to make a positive impact at Rice University. There are many ways for students to get involved on campus and this is one connection point for students in finding the niche that is right for them.",,Social,Campus events and activities,
Student Life,OwlNest,http://owlnest.rice.edu/,,,,OwlNest is an online platform that allows students to find clubs or events that match their interests and engage with organizations on campus.,,Social,,
Student Life,Student Judicial Programs (SJP),https://sjp.rice.edu/,sjp@rice.edu,713-348-4786,"301 Lovett Hall, Entrance A","Student Judicial Programs articulates and enforces the expectations of the Rice University community. These expectations are written in our Code of Student Conduct, Alcohol Policy, Sexual Misconduct Policy, in other Rice documents. The expectations for behavior at Rice arise from our shared values as a community; the written rules in these documents memorialize those shared community values.",,,,
Student Life,Center for Civic Leadership (CCL),https://ccl.rice.edu/,ccl@rice.edu,713-348-2223,"Rice Memorial Center, Room 208",,https://ccl.rice.edu/advising-hours,,,
Student Life,Rice Program Council,http://rpc.rice.edu/,,,,"Rice Program Council (RPC) is the student-run campus-wide programming board, organizing 40+ events open to all undergraduate students throughout the school year. Some major events include Willy Week & Beer Bike, Homecoming, Esperanza, Rondelet, and Screw Your Roommate.",,Social,Campus events and activities,
Student Life,Graduate Student Association (GSA),https://gsa.rice.edu/,gsa@rice.edu,,Ley Student Center,The Graduate Student Association (GSA) of Rice University is the inclusive student governing body of all Rice students enrolled in a graduate-level degree program. The officers and representatives of the GSA strive to continually improve the Rice graduate experience. Get involved! Join a committee or an event.,,Graduate students,https://gsa.rice.edu/about-gsa,
Student Life,Rice Women's Resource Center,https://women.rice.edu/,ricewrc@gmail.com,,"Rice Memorial Center, Room 122 (Across from Coffeehouse)","The Rice Women's Resource Center is not only a space on the Rice University campus, but also a community that fosters personal relationships and conversations. Our vision is to increase awareness of and sensitivity to gender issues in order to build a more supportive, dynamic atmosphere on campus. Through a series of educational and social events and programs, we hope to actively engage with diverse identities and facilitate critical discussion of gender issues. The center also serves as an innovative platform and safe space for expression and development of philosophies and ideologies.",,,"Freebies: feminine care goods, male and female condoms, lube, pregnancy tests, plan b, diva cups, elastic bands, and more!",
Student Life,Office of Student Media,http://studentmedia.rice.edu/,,,,"The Office of Student Media facilitates student development, learning and innovation within student-run media organizations through training, advising and mentoring under the auspices of a designated public forum supporting the tenets of the First Amendment. OSM works with the student news outlet, The Rice Thresher; the radio station, KTRU and the undergraduate yearbook, The Campanile. All undergraduates are encouraged to engage with these media, but to also work for the groups. They can fill out an interest form here.",,,,
Student Life,Liu Idea Lab for Innovation and Entrepreneurship (Lilie),https://entrepreneurship.rice.edu/,,,,"The Office of Student Media facilitates student development, learning and innovation within student-run media organizations through training, advising and mentoring under the auspices of a designated public forum supporting the tenets of the First Amendment. OSM works with the student news outlet, The Rice Thresher; the radio station, KTRU and the undergraduate yearbook, The Campanile. All undergraduates are encouraged to engage with these media, but to also work for the groups. They can fill out an interest form here.",,,,
Wellbeing/Health/Safety,Rice Counseling Center (RCC),https://wellbeing.rice.edu/counseling-center/about-us,,713-348-3311,"Barbara and David Gibbs Wellness Center, 1st floor","The clinical team at the RCC is a diverse team of psychologists, social workers, counselors, and consulting psychiatrist committed to providing professional, compassionate and individualized care. The RCC team provides assessment, short-term psychotherapy, and consultation services.",,Mental Health,"Family, friends and intimate relationships
Self-Esteem
Academic performances
Problems with anxiety
Sexual orientation
Eating and body image concerns
Race, ethnicity and cultural identity
Bereavement
Concerns about alcohol and/or drug abuse
Feelings of sadness
",
Wellbeing/Health/Safety,Wellbeing Office,https://wellbeing.rice.edu/studentwellbeing,wellbeing@rice.edu,713-348-3311,"Barbara and David Gibbs Wellness Center, 1st floor","The Student Wellbeing Office serves as a primary prevention program to address the occurrence of wellbeing and mental health concerns for undergraduate and graduate students at Rice University. Our staff members are trained professionals who can help students to address a wide range of wellbeing issues such as stress management, relationship concerns, difficulty making decisions, struggling with identity, and academic concerns or problems that are more serious in nature.",https://calendly.com/d/cp5-ny5-6k3/wellbeing-advising-meeting,Mental Health,"stress management
adjustment concerns
relationship issues
roommate communication problems
difficulty making decisions
struggling with identity
academic struggles
taking time off
navigating resources",
Wellbeing/Health/Safety,Rice Health Advisors (RHAs),http://rha.rice.edu/,,,,"RHAs are students who have been trained on a variety of wellbeing topics. These students work at their college to provide health education opportunities, health supplies, and peer guidance. RHAs also act as a liaison between the Student Wellbeing Office and the residential colleges, staying up to date on campus-wide wellbeing programming.",,Physical Health; Mental Health,"Physical health items; 
Suicide prevention
Mental health first aid
Conflict resolution
Body image
Substance use/abuse
Eating habits
Academic stress and anxiety
Sexual health",
Wellbeing/Health/Safety,Student Health Services,https://health.rice.edu/,hlsv@rice.edu,713-348-4966,Morton L. Rich Student Health Center (near Brown College Magister's House),Rice Student Health Services provides preventive and outpatient clinical care for the students of Rice University.,,Physical Health,,https://health.rice.edu/services
Wellbeing/Health/Safety,Student Health Insurance,https://studenthealthinsurance.rice.edu/,studentinsurance@rice.edu,713-348-5544,"Cambridge Office Building, 3rd floor",All degree seeking students are required to have health insurance.,,Physical Health; Mental Health; Finances,,
Wellbeing/Health/Safety,SAFE Office,https://safe.rice.edu/,titleixsupport@rice.edu,713-348-3311,Morton L. Rich Student Health Center (near Brown College Magister's House),"Rice University’s The SAFE Office: Interpersonal Misconduct Prevention and Support offers care management and navigation to students who are reporting an incident of interpersonal violence perpetrated against them and to students who have been accused of perpetrating interpersonal violence.

The Office also provides prevention education to the Rice community on sexual and domestic violence, sexual harassment, stalking and Title IX and Clery Act requirements.",,Physical Health; Mental Health,"Emotional Support
Education on healthy relationships, consent, and interpersonal violence dynamics
Safety planning
Information on reporting options
Accompaniments to appointments
Assistance with Supportive Measures
Referrals to on and off campus resources
Navigation support for reporting and responding students in Title IX related SJP cases",
Wellbeing/Health/Safety,Disability Resource Center (DRC),http://drc.rice.edu/,adarice@rice.edu,713-348-5841,111 Allen Center,"It is the mission of the Disability Resource Center (DRC) to be committed to providing access to the educational environment for students. The DRC also assists faculty, staff, and visitors with accommodation requests to help ensure equal access and opportunity.",,Academic challenges,Disability accomodations,https://drc.rice.edu/students#Services
Wellbeing/Health/Safety,Emergency Resources,https://emergency.rice.edu/what-to-do,,,,,,Safety/Health,,
Wellbeing/Health/Safety,Rice University Police Department (RUPD),https://rupd.rice.edu/,,713-348-6000 (24/7 assistance),Entrance 8,"The Rice University Police Department (RUPD) takes the lead in providing a safe environment for the university community by protecting life and property. To achieve this protection, RUPD maintains patrols to deter and detect crime, report fires, and safety hazards, and control traffic on campus.

The police department is also responsible for investigating all crimes that occur on campus. To ensure the security of the campus, it is important that members of the community promptly report all crimes and emergencies, including personal injuries, fire, and traffic accidents to RUPD.",,Safety/Health,,
Wellbeing/Health/Safety,Rice University Emergency Medical Services (REMS),http://rems.rice.edu/,,713-348-6000 (24/7 assistance),,"Rice University Emergency Medical Services (REMS) is a First Responder Organization comprised of undergraduate volunteers who are certified EMTs and AEMTs. We are dedicated to promoting campus safety by providing high quality emergency medical care and community education. REMS also provides coverage for large special events, teaches American Heart Association CPR and First Aid courses, and offers the EMT-Basic and Advanced EMT courses to undergraduates for both academic credit and national certification. We are available to respond to emergency calls on and around Rice campus 24/7 throughout the year and can be reached at the same number as RUPD: (713)-348-6000. For more information, please visit http://rems.rice.edu/",,Safety/Health,,
Wellbeing/Health/Safety,Undergraduate Alcohol Policy,https://dou.rice.edu/student-resources/student-life-resources/undergraduate-alcohol-policy,,,,,,Safety/Health,,
Wellbeing/Health/Safety,Gibbs Recreation and Wellness Center,https://recreation.rice.edu/,ricerec@rice.edu,713-348-4058,,"The mission of the Gibbs Recreation and Wellness Center is to encourage a lifetime of health and wellness for the students, faculty, and staff of Rice university by promoting the physical, social, and emotional benefits of physical activity. The Recreation and Wellness Center offers informal recreation opportunities as well as formal programs in aquatics, dance, fitness, intramural and club sports, and outdoor recreation.",,Physical Health,,
Parking and Transportation,Rice Parking,https://parking.rice.edu/,,713-348-5223,,"The Parking Office is responsible for overseeing and maintaining vehicle registration as well as the parking gates, garages, and lots.",,,,
Parking and Transportation,Rice Transportation Department,http://transportation.rice.edu/,,713-348-5996,,The Rice Transportation Department is committed to providing safe and convenient transportation services and commuting information to the Rice community. For service details visit https://transportation.rice.edu/,,,,
Information Technology,Office of Information Technology (OIT),https://oit.rice.edu/,helpdesk@rice.edu,713-348-HELP (4357),,"The Office of Information Technology (OIT) is Rice’s computing service organization providing a range of services from course tools, email, computing labs and printers, network connectivity, technical troubleshooting, and offering advice for purchasing computers and obtaining software.

Students can request assistance via the OIT Help Desk about account management, connectivity to Rice network, password resets, general troubleshooting, mobile device support, VPN configuration, email setup, and more. Students can also search the OIT KnowledgeBase of instructional documentation.",,,,
Campus Bookstore,Rice University Official Bookstore,http://www.bkstr.com/riceuniversitystore/home/en,,713-348-2039,,"Located on the first and basement levels of the Rice Memorial Center, the Rice Bookstore is a convenient stop for textbooks, memorabilia, and clothing and accessories to support Rice or your College.",,,,`;
}

export async function matchKeywords(userInput: string) {
  'use server'

  // Download resource spreadsheet
  const entireSpreadsheet: string = callSheets();

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `The following is the user's input to our application: ${userInput}
    
    Please match the user input with a resource from the following spreadsheet: ${entireSpreadsheet}

    Finally, return the recommended resource in the format of: [resource name] | [location] | [contact info] | [scheduling link]
    `,
  });
  console.log(response.text);
  console.log(response.candidates);
  console.log(response.promptFeedback);

  return response.text;
}

