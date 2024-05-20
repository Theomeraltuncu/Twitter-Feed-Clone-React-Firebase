// import { useNavigate } from "react-router-dom"
// import { auth } from "../firebase/config"
// import { signOut } from "firebase/auth"
// signOut

// const Home = () => {

//   const navigte = useNavigate()

//   const handleLogOut = () =>{
//     signOut(auth)
//     .then(()=> navigte("/"))
//   }



//   return (
//     <div>
//       <h1 className="text-3xl text-white text-center my-5">Home page</h1>
//       <h2 className="text-3xl text-white text-center my-5">
//         {auth.currentUser?.displayName}
//       </h2>

//       <button onClick={handleLogOut} className="w-full text-center ">Log out</button>
//     </div>
//   )
// }

// export default Home