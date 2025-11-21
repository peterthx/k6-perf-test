function randomAddress() {
  const streets = [
    "El Camino Real", "Middlefield Rd", "Castro St", "University Ave",
    "Stevens Creek Blvd", "Alma St", "Central Expy", "Homestead Rd",
    "San Antonio Rd", "Page Mill Rd", "Shoreline Blvd"
  ];

  const cities = [
    "Mountain View",
    "Palo Alto",
    "Los Altos",
    "Sunnyvale",
    "Santa Clara",
    "Cupertino",
    "Menlo Park",
    "Redwood City",
    "San Jose"
  ];

  const zipcodes = [
    "94022", "94024", "94025", "94040", "94041", "94043",
    "94085", "94086", "94087", "94089", "94301", "94303",
    "95014", "95050", "95051", "95054", "95110", "95112"
  ];

  // -------------------- HELPERS --------------------
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // -------------------- MAIN FUNCTION --------------------
  const streetNumber = Math.floor(100 + Math.random() * 9000);
  const street = pick(streets);
  const city = pick(cities);
  const zipcode = pick(zipcodes);

  return `${streetNumber} ${street}, ${city}, CA ${zipcode}`;
}

function randomSupplierName() {
  const names = [
    "Unified Schinner Systems",
    "Premium Tech Supplies",
    "Global Nexus Corp",
    "Apex Integrated Solutions",
    "BlueStone Distribution"
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function randomContactName() {
  const names = [
    "Jamel Schinner",
    "Alex Johnson",
    "Sophia Carter",
    "Michael Lee",
    "Emma Rodriguez"
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function randomEmail(name) {
  const domains = ["mail.com", "supplier.org", "business.net"];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const formattedName = name.toLowerCase().replace(" ", ".");
  return `${formattedName}@${domain}`;
}

function randomPhoneNumber() {
  const phone = `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
  return phone;
}

export { randomSupplierName, randomContactName, randomEmail, randomPhoneNumber, randomAddress };