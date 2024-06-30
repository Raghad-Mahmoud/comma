const topicTitle = [
  {
    topic: 'Programming Languages',
    title: '2020 Complete Python Bootcamp: From Zero to Hero in Python'
  },
  {
    topic: 'Web Development',
    title: 'Angular - The Complete Guide (2020 Edition)'
  },
  {
    topic: 'Web Development',
    title: 'The Complete Web Developer Course 2.0'
  },
  {
    topic: 'Web Development',
    title: 'Vue - The Complete Guide (w/ Router, Vuex, Composition API)'
  },
  {
    topic: 'Mobile Development',
    title: 'The Complete React Native + Hooks Course [2020 Edition]'
  },
  {
    topic: 'Database Design & Development',
    title: 'Docker and Kubernetes: The Complete Guide'
  },
  {
    topic: 'Data Science',
    title: 'Data Science A-Z™: Real-Life Data Science Exercises Included'
  },
  {
    topic: 'Mobile Development',
    title: 'The Complete Android N Developer Course'
  },
  {
    topic: 'Programming Languages',
    title: 'Master Microservices with Spring Boot and Spring Cloud'
  },
  {
    topic: 'Programming Languages',
    title: 'Understanding TypeScript - 2020 Edition'
  },
  {
    topic: 'Data Science',
    title: 'Artificial Intelligence A-Z™: Learn How To Build An AI'
  },
  {
    topic: 'Programming Languages',
    title: 'Python for beginners'
  },
  {
    topic: 'Web Development',
    title: 'Angular Crash Course for Busy Developers'
  },
  {
    topic: 'Programming Languages',
    title: 'C Programming For Beginners - Master the C Language'
  },
  {
    topic: 'Web Development',
    title: 'Learn HTML5 Programming From Scratch'
  },
  {
    topic: 'Web Development',
    title: 'Build an app with ASPNET Core and Angular from scratch'
  },
  {
    topic: 'Web Development',
    title: 'Node with React: Fullstack Web Development'
  },
  {
    topic: 'Web Development',
    title: 'The Web Developer Bootcamp'
  },
  {
    topic: 'Data Science',
    title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science'
  },
  {
    topic: 'Programming Languages',
    title: 'The Complete JavaScript Course 2020: Build Real Projects!'
  },
  {
    topic: 'Programming Languages',
    title: 'Learn Python Programming Masterclass'
  },
  {
    topic: 'Web Development',
    title: 'The Complete Node.js Developer Course (3rd Edition)'
  },
  {
    topic: 'Programming Languages',
    title: 'Unreal Engine C++ Developer: Learn C++ and Make Video Games'
  },
  {
    topic: 'Database Design & Development',
    title: 'The Ultimate MySQL Bootcamp: Go from SQL Beginner to Expert'
  },
  {
    topic: 'Programming Languages',
    title: 'Spring & Hibernate for Beginners (includes Spring Boot)'
  },
  {
    topic: 'Database Design & Development',
    title: 'Docker Mastery: with Kubernetes +Swarm from a Docker Captain'
  },
  {
    topic: 'Programming Languages',
    title: 'JavaScript: Understanding the Weird Parts'
  },
  {
    topic: 'Data Science',
    title: 'R Programming A-Z™: R For Data Science With Real Exercises!'
  },
  {
    topic: 'Mobile Development',
    title: 'iOS 11 & Swift 4 - The Complete iOS App Development Boot'
  },
  {
    title: 'Selenium WebDriver with Java -Basics to Advanced+Frameworks',
    topic: 'Software Testing'
  },
  { title: 'Build Responsive Real World Websites with HTML5 and CSS3', topic: 'Web Development' },
  { title: 'Python and Django Full Stack Web Developer Bootcamp', topic: 'Web Development' },
  { title: 'Flutter & Dart - The Complete Guide [2020 Edition]', topic: 'Mobile Development' },
  {
    title: 'Ultimate AWS Certified Developer Associate 2020 - NEW!',
    topic: 'Database Design & Development'
  },
  { title: 'Complete C# Unity Game Developer 3D', topic: 'Programming Languages' },
  {
    title: 'The Complete 2020 Flutter Development Bootcamp with Dart',
    topic: 'Mobile Development'
  },
  { title: 'Complete Python Developer in 2020: Zero to Mastery', topic: 'Programming Languages' },
  {
    title: 'The Complete Python 3 Course: Beginner to Advanced!',
    topic: 'Programming Languages'
  },
  { title: 'Learn and Understand AngularJS', topic: 'Web Development' },
  { title: 'Angular & NodeJS - The MEAN Stack Guide [2020 Edition]', topic: 'Web Development' },
  { title: 'Apache Kafka Series - Learn Apache Kafka for Beginners v2', topic: 'Data Science' },
  { title: 'The Complete React Developer Course (w/ Hooks and Redux)', topic: 'Web Development' },
  { title: 'React Native - The Practical Guide [2020 Edition]', topic: 'Mobile Development' },
  { title: 'Complete Guide to TensorFlow for Deep Learning with Python', topic: 'Data Science' },
  {
    title: 'Git Complete: The definitive, step-by-step guide to Git',
    topic: 'Programming Languages'
  },
  { title: 'iOS 10 & Swift 3: From Beginner to Paid Professional™', topic: 'Mobile Development' },
  { title: 'Python for Financial Analysis and Algorithmic Trading', topic: 'Data Science' },
  {
    title: 'C# Advanced Topics: Prepare for Technical Interviews',
    topic: 'Programming Languages'
  },
  { title: 'Learn JIRA with real-world examples (+Confluence bonus)', topic: 'Software Testing' },
  {
    title: 'The Ultimate Guide to Game Development with Unity 2019',
    topic: 'Programming Languages'
  },
  {
    title: 'Ionic - Build iOS, Android & Web Apps with Ionic & Angular',
    topic: 'Mobile Development'
  },
  { title: 'Spring Framework 5: Beginner to Guru', topic: 'Programming Languages' },
  {
    title: 'Rest API Testing (Automation) from Scratch -RestAssured Java',
    topic: 'Software Testing'
  },
  { title: 'Become a WordPress Developer: Unlocking Power With Code', topic: 'Web Development' },
  { title: 'Apache Spark with Scala - Hands On with Big Data!', topic: 'Data Science' },
  {
    title: 'Java Programming Masterclass for Software Developers',
    topic: 'Programming Languages'
  },
  { title: 'The Complete 2020 Web Development Bootcamp', topic: 'Web Development' },
  { title: 'Python for Data Science and Machine Learning Bootcamp', topic: 'Data Science' },
  {
    title: 'The Data Science Course 2020: Complete Data Science Bootcamp',
    topic: 'Data Science'
  },
  { title: 'Automate the Boring Stuff with Python Programming', topic: 'Programming Languages' },
  { title: 'Modern React with Redux [2020 Update]', topic: 'Web Development' },
  {
    title: 'The Python Mega Course: Build 10 Real World Applications',
    topic: 'Programming Languages'
  },
  {
    title: 'The Complete Web Developer in 2020: Zero to Mastery',
    topic: 'Web Development'
  },
  {
    title: 'C# Basics for Beginners: Learn C# Fundamentals by Coding',
    topic: 'Programming Languages'
  },
  {
    title: 'Deep Learning A-Z™: Hands-On Artificial Neural Networks',
    topic: 'Data Science'
  },
  {
    title: 'The Python Bible™ | Everything You Need to Program in Python',
    topic: 'Programming Languages'
  },
  {
    title: 'Advanced CSS and Sass: Flexbox, Grid, Animations and More!',
    topic: 'Web Development'
  },
  {
    title: 'Learn and Understand NodeJS',
    topic: 'Web Development'
  },
  {
    title: 'Machine Learning, Data Science and Deep Learning with Python',
    topic: 'Data Science'
  },
  {
    title: 'The Complete Oracle SQL Certification Course',
    topic: 'Database Design & Development'
  },
  {
    title: 'The Complete Angular Course: Beginner to Advanced',
    topic: 'Web Development'
  },
  {
    title: 'Modern JavaScript From The Beginning',
    topic: 'Web Development'
  },
  {
    title: 'NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)',
    topic: 'Web Development'
  },
  {
    title: 'Python for Absolute Beginners',
    topic: 'Programming Languages'
  },
  {
    title: "Learn How To Code: Google's Go (golang) Programming Language",
    topic: 'Programming Languages'
  },
  {
    title: 'The Complete Android Oreo Developer Course - Build 23 Apps!',
    topic: 'Mobile Development'
  },
  {
    title: 'The Ultimate Excel Programmer Course',
    topic: 'Data Science'
  },
  {
    title: 'The Complete WordPress Website Business Course',
    topic: 'Web Development'
  },
  {
    title: 'Bootstrap 4 From Scratch With 5 Projects',
    topic: 'Web Development'
  },
  {
    title: 'Spark and Python for Big Data with PySpark',
    topic: 'Data Science'
  },
  {
    title: 'Ultimate Web Designer & Developer Course: Build 23 Projects!',
    topic: 'Web Development'
  }
]
module.exports = { topicTitle }
