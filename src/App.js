import { BrowserRouter,Routes,Route, } from "react-router-dom";
//components
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import Message from "./components/Layout/Message";
//pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Container from "./components/Layout/Container";
//context
import { UserProvider} from "./context/useContext";
//hooks
import { useState } from "react";
import Profile from "./pages/user/Profile";
import MyPets from "./pages/pet/MyPets";
import AddPet from "./pages/pet/AddPet";
import EditPet from "./pages/pet/EditPet";
import PetDetails from "./pages/pet/PetDetails";
import MyAdoptions from "./pages/pet/MyAdoptions";

function App() {
  const [user,setUser] = useState(true)


  
  return (
    <BrowserRouter>
      <UserProvider value = {user}>
        <Navbar/> 
        <Message/>
        <Container>
        <Routes>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        <Routes>
          <Route path="/register" element={<Register/>}/>
        </Routes>
        <Routes>
          <Route path="/user/profile" element={<Profile/>}/>
        </Routes>
       
        <Routes>
          <Route path="/pets/mypets" element={<MyPets/>}/>
        </Routes>
        <Routes>
          <Route path="/pets/myadoptions" element={<MyAdoptions/>}/>
        </Routes>
        <Routes>
          <Route path="/pets/add" element={<AddPet/>}/>
        </Routes>
        <Routes>
          <Route path="/pets/edit/:id" element={<EditPet/>}/>
        </Routes>
        <Routes>
          <Route path="/pets/details/:id" element={<PetDetails/>}/>
        </Routes>
      
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        </Container>
      <Footer/>
      </UserProvider>
    </BrowserRouter>

  );
}

export default App;
