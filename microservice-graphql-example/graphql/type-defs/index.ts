export const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    book: Book
  }
`;

const databaseTypeDefs = `#graphql
  type Order {
    order_id: ID!
    customer_id: ID!
    employee_id: ID!
    order_date: String
    required_date: String
    shipped_date: String
    ship_via: String
    freight: Shipper
    ship_name: String
    ship_address: String
    ship_city: String
    ship_region: String
    ship_postal_code: String
    ship_country: String
  }

  type Shipper {
    shipper_id: ID!
    company_name: String
    phone: String
  }

  type Employee {
    employee_id: ID!
    last_name: String
    first_name: String
    title: String
    title_of_courtesy: String
    birth_date: String
    hire_date: String
    address: String
    city: String
    region: String
    postal_code: String
    country: String
    home_phone: String
    extension: String
    photo: String
    notes: String
    reports_to: Int
    photo_path: String
  }

  type Customer {
    customer_id: ID!
    company_name: String
    contact_name: String
    contact_title: String
    address: String
    city: String
    region: String
    postal_code: String
    country: String
    phone: String
    fax: String
  }

  type Product {
    product_id: ID!
    supplier_id: ID!
    category_id: ID!
    quantity_per_unit: String
    unit_price: Int
    units_in_stock: Int
    units_on_order: Int
    reorder_level: String
    discontinued: String
  }

  type Category {
    category_id: ID!
    category_name: String
    description: String
    picture: String
  }

  type Supplier {
    suppier_id: ID!
    company_name: String
    contact_name: String
    contact_title: String
    address: String
    city: String
    region: String
    postal_code: String
    country: String
    phone: String
    fax: String
    homepage: String
  }

  type Query {
    getOrders(page: Int!): [Order]
    getOrderDetails(id: ID!): Order
    getShipppers(page: Int!): [Shipper]
    getEmployees(page: Int!): [Employee]
    getCustomers(page: Int!): [Customer]
    getProducts(page: Int!): [Produt]
    getCategories(page: Int!): [Category]
    getSuppliers(page: Int!): [Supplier]
  }
`