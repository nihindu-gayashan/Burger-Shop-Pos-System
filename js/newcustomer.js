
  
  const customerForm = document.getElementById('customerForm');
  customerForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const newCustomer = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      birthDate: document.getElementById('birthDate').value,
      preferredContact: document.getElementById('preferredContact').value,
      deliveryAddress: document.getElementById('deliveryAddress').value,
      vegetarian: document.getElementById('vegetarian').checked,
      glutenFree: document.getElementById('glutenFree').checked,
      dairyFree: document.getElementById('dairyFree').checked,
      nutAllergy: document.getElementById('nutAllergy').checked,
      emailNewsletter: document.getElementById('emailNewsletter').checked,
      smsOffers: document.getElementById('smsOffers').checked,
      orders: 0,
      lastOrder: null,
      status: 'Active'
    };
  
    customers.push(newCustomer);
    console.log(customers);
  
    customerForm.reset();
  });
  const customers = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      birthDate: '1980-05-15',
      preferredContact: 'email',
      deliveryAddress: '123 Main St, Anytown USA',
      vegetarian: false,
      glutenFree: false,
      dairyFree: false,
      nutAllergy: false,
      emailNewsletter: true,
      smsOffers: false,
      orders: 15,
      lastOrder: '2024-02-15',
      status: 'Active'
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '(555) 987-6543',
      birthDate: '1985-09-20',
      preferredContact: 'phone',
      deliveryAddress: '456 Oak Rd, Someplace City',
      vegetarian: true,
      glutenFree: true,
      dairyFree: true,
      nutAllergy: false,
      emailNewsletter: true,
      smsOffers: true,
      orders: 8,
      lastOrder: '2024-02-10',
      status: 'Active'
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@example.com',
      phone: '(555) 246-8135',
      birthDate: '1975-02-10',
      preferredContact: 'sms',
      deliveryAddress: '789 Elm St, Othertown',
      vegetarian: false,
      glutenFree: false,
      dairyFree: true,
      nutAllergy: true,
      emailNewsletter: false,
      smsOffers: true,
      orders: 3,
      lastOrder: '2024-01-20',
      status: 'Inactive'
    }
  ];
 