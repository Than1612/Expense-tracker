import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Button, Row, Col, Card, Container,Navbar, Nav, NavDropdown  } from 'react-bootstrap';
import RegistrationForm from './components/reg';
import Chart from './components/Chart';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from './contexts/BudgetsContext';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import ViewExpensesModal from './components/ViewExpensesModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import './App.css';


const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistrationSubmit = (formData) => {
    console.log('Registration form data:', formData);
    setIsRegistered(true);
  };

  const handleLogout = () => {
    setIsRegistered(false);
  };

  return (
    <Router>
    <div
      style={{
        backgroundImage: `url('https://i.pinimg.com/564x/27/86/61/27866146e40ae04f8fb43cab2e0f3742.jpg')`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh', 
        paddingTop: '70px',
        opacity: '0.92'
      }}
    >      
       <Navbar bg="black" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Expense Tracker
            </Navbar.Brand>
            <Nav className="ms-auto">
              {!isRegistered && (
                <Nav.Link as={Link} to="/register" className="me-2">
                  Login
                </Nav.Link>
              )}
              {isRegistered && (
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Container>
        </Navbar>
      
      <Container className="expense-tracker-container my-4">
        <Routes>
          <Route
            path="/"
            element={
              isRegistered ? (
                <Home isRegistered={isRegistered} />
              ) : (
                <>
                  <h1>Welcome to your Tracking System</h1>
                  <h4>Set your Bills Tracking...</h4>
                </>
              )
            }
          />
          <Route
            path="/register"
            element={!isRegistered ? <RegistrationForm onSubmit={handleRegistrationSubmit} /> : <Navigate to="/" />}
          />
        </Routes>
      </Container>
      <br></br><br></br>
      <footer style={{ backgroundColor: 'black', color: 'white', padding: '15px 0', textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
          <p>All rights reserved</p>
      </footer>
    </div>
  </Router>
);
};


const Home = () => {
  const { budgets, getBudgetExpenses } = useBudgets();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  const chartDataPoints = budgets.map((budget) => {
    const totalAmount = getBudgetExpenses(budget.id).reduce(
      (total, expense) => total + expense.amount,
      0
    );
    return { label: budget.name, value: totalAmount };
  });

  return (
    <div>
      <h1 className="expense-tracker-heading text-center mb-4" style={{ fontFamily: 'Times New Roman', color: 'navy', fontWeight: 'bold' }}>
        Expense Tracker
      </h1>
      <Row className="expense-tracker-button-row mb-4">
        <Col className="add-budget-col text-center">
          <Button
            variant="warning"
            className="add-budget-button"
            style={{ fontFamily: 'Times New Roman', fontSize: '16px', fontWeight: 'bold', border: '1px solid black', marginRight: '10px', color: 'black' }}
            onClick={() => setShowAddBudgetModal(true)}
          >
            Add Budget
          </Button>
        </Col>
        <Col className="add-expense-col text-center">
          <Button
            variant="warning"
            className="add-expense-button"
            style={{ fontFamily: 'Times New Roman', fontSize: '16px', fontWeight: 'bold', border: '1px solid black' }}
            onClick={openAddExpenseModal}
          >
            Add Expense
          </Button>
        </Col>
      </Row>
      <Row>
      <div className="expense-tracker-sub-heading text-center mb-1" style={{ fontFamily: 'Times New Roman', color: 'navy', fontSize: '19px', fontWeight: 'bold' }}>
        Comparison Chart
      </div>
      </Row>
      <div className="chart-container my-3">
        <Chart dataPoints={chartDataPoints} />
      </div>
      <Row className="expense-tracker-row mb-4">
        {budgets.map((budget) => (
          <Col key={budget.id} sm={12} md={6} lg={4}>
            <Card className="expense-card my-3" style={{ backgroundColor: 'lightblue', fontFamily: 'Times New Roman', fontSize: '14px' }}>
              <Card.Body>
                <Card.Title className="budget-name" style={{ color: 'navy', fontWeight: 'bold' }}>
                  {budget.name}
                </Card.Title>
                <Card.Text className="total-amount">
                  Total Amount: ₹
                  {getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)}
                </Card.Text>
                <Button variant="success" className="add-expense" onClick={() => openAddExpenseModal(budget.id)}>
                  Add Expense
                </Button>
                &nbsp;&nbsp;
                <Button variant="secondary" className="view-expenses" onClick={() => setViewExpensesModalBudgetId(budget.id)}>
                  View Expenses
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col sm={12} md={6} lg={4}>
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
        </Col>
        <Col sm={12} md={6} lg={4}>
          <TotalBudgetCard />
        </Col>
      </Row>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)} />
      <ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleClose={() => setViewExpensesModalBudgetId()} />
    </div>
  );
};

export default App;
