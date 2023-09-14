import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from './Pages/HomePage';
import Header from './components/Header';
import DashBoard from './Pages/DashBoard';
import Container from './components/Container';
import Create from './components/Create';
import Invoices from './Pages/Invoices';
import ClientList from './Pages/ClientList';
import InvoiceDetails from './Pages/InvoiceDetails';
import EditInvoice from './Pages/EditInvoice';

function App() {

  return (
    <BrowserRouter>
      <div className='bg-gray-300' >
        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} exact />
              <Route path="/dashboard" element={<Container><DashBoard /></Container>} exact/>
              <Route path="/create" element={<Container><Create/></Container>} exact />
              <Route path="/invoices" element={<Container><Invoices /></Container>} exact />
              <Route path="/customers" element={<Container><ClientList /></Container>} exact />
              <Route path="/invoice/:id" element={<Container><InvoiceDetails /></Container>} exact />
              <Route path="/edit/invoice/:id" element={<Container><EditInvoice /></Container>} exact />
            </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
