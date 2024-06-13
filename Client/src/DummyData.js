export const Users = [
  {
    id: 1,
    profilePicture: "person/1.jpeg",
    username: "Safak Kocaoglu",
  },
  {
    id: 2,
    profilePicture: "person/2.jpeg",
    username: "Janell Shrum",
  },
  {
    id: 3,
    profilePicture: "person/3.jpeg",
    username: "Alex Durden",
  },
  {
    id: 4,
    profilePicture: "person/4.jpeg",
    username: "Dora Hawks",
  },
  {
    id: 5,
    profilePicture: "person/5.jpeg",
    username: "Thomas Holden",
  },
  {
    id: 6,
    profilePicture: "person/6.jpeg",
    username: "Shirley Beauchamp",
  },
  {
    id: 7,
    profilePicture: "person/7.jpeg",
    username: "Travis Bennett",
  },
  {
    id: 8,
    profilePicture: "person/8.jpeg",
    username: "Kristen Thomas",
  },
  {
    id: 9,
    profilePicture: "person/9.jpeg",
    username: "Gary Duty",
  },
  {
    id: 10,
    profilePicture: "person/10.jpeg",
    username: "Safak Kocaoglu",
  },
];

export const Posts = [
  {
    id: 1,
    desc: "Love For All, Hatred For None.",
    photo: "post/1(1).jpeg",
    date: "5 mins ago",
    userId: 1,
    like: 32,
    comment: 9,
  },
  {
    id: 2,
    photo: "post/2(1).jpeg",
    date: "15 mins ago",
    userId: 2,
    like: 2,
    comment: 1,
  },
  {
    id: 3,
    desc: "Every moment is a fresh beginning.",
    photo: "post/3(1).jpeg",
    date: "1 hour ago",
    userId: 3,
    like: 61,
    comment: 2,
  },
  {
    id: 4,
    photo: "post/4(1).jpeg",
    date: "4 hours ago",
    userId: 4,
    like: 7,
    comment: 3,
  },
  {
    id: 5,
    photo: "post/5(1).jpeg",
    date: "5 hours ago",
    userId: 5,
    like: 23,
    comment: 5,
  },
  {
    id: 6,
    photo: "post/6(1).jpeg",
    date: "1 day ago",
    userId: 6,
    like: 44,
    comment: 6,
  },
  {
    id: 7,
    desc: "Never regret anything that made you smile.",
    photo: "post/7(1).jpeg",
    date: "2 days ago",
    userId: 7,
    like: 52,
    comment: 3,
  },
  {
    id: 8,
    photo: "post/8(1).jpeg",
    date: "3 days ago",
    userId: 8,
    like: 15,
    comment: 1,
  },
  {
    id: 9,
    desc: "Change the world by being yourself.",
    photo: "post/9(1).jpeg",
    date: "5 days ago",
    userId: 9,
    like: 11,
    comment: 2,
  },
  {
    id: 10,
    photo: "post/10(1).jpeg",
    date: "1 week ago",
    userId: 10,
    like: 104,
    comment: 12,
  },
];

// async function insertUsers() {
//   let userIDs = [];
//   const Users = [
//     {
//       _id: new mongoose.Types.ObjectId(),
//       username: "Deepak",
//       email: "Deepak@123",
//       profilePicture: "person/1.jpeg",
//       coverPicture: "post/1(1).jpeg",
//       description: "Mera Naam Deepak hai !!",
//       city: "Jodhpur",
//       from: "Jodhpur",
//       relationship: "single",
//     },
//     {
//       _id: new mongoose.Types.ObjectId(),
//       username: "Sachin",
//       email: "Sachin@123",
//       profilePicture: "person/2.jpeg",
//       coverPicture: "post/2(1).jpeg",
//       description: "Mera Naam Sachin hai !!",
//       city: "Jodhpur",
//       from: "Jodhpur",
//       relationship: "single",
//     },
//     {
//       _id: new mongoose.Types.ObjectId(),
//       username: "Bhaskar",
//       email: "Bhaskar@123",
//       profilePicture: "person/3.jpeg",
//       coverPicture: "post/3(1).jpeg",
//       description: "Mera Naam Bhaskar hai !!",
//       city: "Bharatpur",
//       from: "Bharatpur",
//       relationship: "dingle",
//     },
//     {
//       _id: new mongoose.Types.ObjectId(),
//       username: "Mohit",
//       email: "Mohit@123",
//       profilePicture: "person/4.jpeg",
//       coverPicture: "post/4(1).jpeg",
//       description: "Mera Naam Mohit hai !!",
//       city: "Mahwa",
//       from: "Mahwa",
//       relationship: "mingle",
//     },
//     {
//       _id: new mongoose.Types.ObjectId(),
//       username: "Vandana",
//       email: "Vandana@123",
//       profilePicture: "person/5.jpeg",
//       coverPicture: "post/5(1).jpeg",
//       description: "Mera Naam Vandana hai !!",
//       city: "Tonk",
//       from: "Tonk",
//       relationship: "triangle",
//     },
//     {
//       _id: new mongoose.Types.ObjectId(),
//       username: "Sohan",
//       email: "Sohan@123",
//       profilePicture: "person/6.jpeg",
//       coverPicture: "post/6(1).jpeg",
//       description: "Mera Naam Sohan hai !!",
//       city: "Pakistan",
//       from: "Pakistan",
//       relationship: "mingle",
//     },
//     {
//       _id: new mongoose.Types.ObjectId(),
//       username: "Aakash",
//       email: "Aakash@123",
//       profilePicture: "person/7.jpeg",
//       coverPicture: "post/7(1).jpeg",
//       description: "Mera Naam Aakash hai !!",
//       city: "Russia",
//       from: "Russia",
//       relationship: "mingle",
//     },
//     {
//       _id: new mongoose.Types.ObjectId(),
//       username: "Aayushi",
//       email: "Aayushi@123",
//       profilePicture: "person/8.jpeg",
//       coverPicture: "post/8(1).jpeg",
//       description: "Mera Naam Aayushi hai !!",
//       city: "Russia",
//       from: "Russia",
//       relationship: "mingle",
//     },
//     {
//       _id: new mongoose.Types.ObjectId(),
//       username: "Vishal",
//       email: "Vishal@123",
//       profilePicture: "person/9.jpeg",
//       coverPicture: "post/9(1).jpeg",
//       description: "Mera Naam Vishal hai !!",
//       city: "Mangal",
//       from: "Mangal",
//       relationship: "mingle",
//     },
//     {
//       _id: new mongoose.Types.ObjectId(),
//       username: "Aprichit",
//       email: "Aprichit@123",
//       profilePicture: "person/10.jpeg",
//       coverPicture: "post/10(1).jpeg",
//       description: "Mera Naam Aprichit hai !!",
//       city: "Nark",
//       from: "Nark",
//       relationship: "mingle",
//     },
//   ];
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash("123", salt);

//   await Promise.all(
//     Users.map(async function (user) {
//       const newUser = new User({ ...user, password: hashedPassword });

//       // Save user
//       const savedUser = await newUser.save();
//       console.log(savedUser);
//       userIDs.push(savedUser._id);
//     })
//   );

//   console.log(userIDs);
// }

// async function insertPosts() {
//   const userIDs = [
//     "666ac0bdfc30b489d853fc6c",
//     "666ac0bdfc30b489d853fc6d",
//     "666ac0bdfc30b489d853fc6e",
//     "666ac0bdfc30b489d853fc6b",
//     "666ac0bdfc30b489d853fc6f",
//     "666ac0bdfc30b489d853fc72",
//     "666ac0bdfc30b489d853fc73",
//     "666ac0bdfc30b489d853fc74",
//     "666ac0bdfc30b489d853fc71",
//     "666ac0bdfc30b489d853fc70",
//   ];

//   const posts = [
//     {
//       description: "Love For All, Hatred For None.",
//       photo: "post/1(1).jpeg",
//       date: "5 mins ago",
//       like: 32,
//       comment: 9,
//     },
//     {
//       photo: "post/2(1).jpeg",
//       date: "15 mins ago",
//       like: 2,
//       comment: 1,
//     },
//     {
//       description: "Every moment is a fresh beginning.",
//       photo: "post/3(1).jpeg",
//       date: "1 hour ago",
//       like: 61,
//       comment: 2,
//     },
//     {
//       photo: "post/4(1).jpeg",
//       date: "4 hours ago",
//       like: 7,
//       comment: 3,
//     },
//     {
//       photo: "post/5(1).jpeg",
//       date: "5 hours ago",
//       like: 23,
//       comment: 5,
//     },
//     {
//       photo: "post/6(1).jpeg",
//       date: "1 day ago",
//       like: 44,
//       comment: 6,
//     },
//     {
//       description: "Never regret anything that made you smile.",
//       photo: "post/7(1).jpeg",
//       date: "2 days ago",
//       like: 52,
//       comment: 3,
//     },
//     {
//       photo: "post/8(1).jpeg",
//       date: "3 days ago",
//       like: 15,
//       comment: 1,
//     },
//     {
//       description: "Change the world by being yourself.",
//       photo: "post/9(1).jpeg",
//       date: "5 days ago",
//       like: 11,
//       comment: 2,
//     },
//     {
//       photo: "post/10(1).jpeg",
//       date: "1 week ago",
//       like: 104,
//       comment: 12,
//     },
//   ];

//   for (let i = 0; i < posts.length; ++i) {
//     const newPost = new Post({ ...posts[i], userId: userIDs[i] });
//     const savedPost = await newPost.save();
//   }
// }
