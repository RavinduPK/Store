import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import ProductsPage from './pages/ProductsPage.jsx'; // Importing ProductsPage
import ContactPage from './pages/ContactPage.jsx'; // Importing ContactPage
import AboutPage from './pages/AboutPage.jsx'; // Importing AboutPage
import ProfilePage from './pages/profilePage.jsx'; // Importing ProfilePage
import {Toaster} from 'react-hot-toast';
import StorePage from './pages/storePage.jsx';
import FoodPage from './pages/foodPage.jsx';
import BooksPage from './pages/booksPage.jsx';
import ClothesPage from './pages/clothesPage.jsx';
import DrinkPage from './pages/drinkPage.jsx';
import ElectricPage from './pages/electricPage.jsx';
import FlowersPage from './pages/flowersPage.jsx';
import FurniturePage from './pages/furniturePage.jsx';
import GiftsPage from './pages/giftsPage.jsx';
import MobilePage from './pages/mobilePage.jsx';  
import ToolsPage from './pages/toolsPage.jsx';  
import ToysPage from './pages/toysPage.jsx';  
import KitchenPage from './pages/kitchenPage.jsx';
import CartPage from './pages/cartPage.jsx';
import PurchasePage from './pages/purchasePage.jsx';
import PrivacyPage from './pages/privacyPage.jsx';
import AboutUs from './pages/aboutUs.jsx';  
import CallPage from './pages/callPage.jsx';


const annonymy = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0c2Jwa2JoZnZ6ZGNta21raWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMjAwMTksImV4cCI6MjA3MTc5NjAxOX0.YeRpo0f0aLq1TtzMHcaPfSKKNf7rnhohxag9qPI8hEc";
const supabase = "https://stsbpkbhfvzdcmkmkiav.supabase.co";

function App() {
  return (
    <BrowserRouter basename='/Store'>
     <Toaster position='top-right'/>
      <Routes>
        {/* Redirect root path to /register */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductsPage />} /> {/* Adding ProductsPage route */}
        <Route path="/products1" element={<StorePage />} /> {/* Adding ProductsPage route */}
        <Route path="/contact" element={<ContactPage />} /> {/* Adding ContactPage route */}
        <Route path="/aboutus" element={<AboutPage />} /> {/* Adding AboutPage route */}
        <Route path="/profile" element={<ProfilePage />} /> {/* Adding ProfilePage route */}
        <Route path="/foods" element={<FoodPage />} /> {/* Adding FoodPage route */}
        <Route path="/books" element={<BooksPage />} /> {/* Adding BooksPage route */}
        <Route path="/clothes" element={<ClothesPage />} /> {/* Adding ClothesPage route */}  
        <Route path="/drinks" element={<DrinkPage />} /> {/* Adding DrinkPage route */}
        <Route path="/electronics" element={<ElectricPage />} /> {/* Adding ElectricPage route */}
        <Route path="/flowers" element={<FlowersPage />} /> {/* Adding FlowersPage route */}
        <Route path="/furniture" element={<FurniturePage />} /> {/* Adding FurniturePage route */}
        <Route path="/gift-item" element={<GiftsPage />} /> {/* Adding GiftsPage route */}
        <Route path="/mobiles" element={<MobilePage />} /> {/* Adding MobilePage route */}
        <Route path="/tool-kit" element={<ToolsPage />} /> {/* Adding ToolsPage route */}
        <Route path="/toys" element={<ToysPage />} /> {/* Adding ToysPage route */}
        <Route path="/kitchen-items" element={<KitchenPage />} /> {/* Adding KitchenPage route */}
        <Route path="/cart" element={<CartPage />} /> {/* Adding CartPage route */}
        <Route path="/purchase" element={<PurchasePage />} /> {/* Adding PurchasePage route */}
        <Route path="/privacy" element={<PrivacyPage />} /> {/* Adding PrivacyPage route */}
        <Route path="/aboutUs1" element={<AboutUs />} /> {/* Adding AboutUs route */}
        <Route path="/call" element={<CallPage />} /> {/* Adding CallPage route */}
       
      

      </Routes>
    </BrowserRouter>
  );
}

export default App;