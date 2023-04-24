// I found the regex on the internet
const emailValidator = async (value) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!emailRegex.test(value)) {
      throw new Error("Email address is invalid");
    }
  };

// Only Letters
const cityValidator = async (value) => {
  const cityRegex = /^[a-zA-Z\s,'-]*$/;
    if (!cityRegex.test(value)) {
      throw new Error("City is invalid");
    }
  };

// Check whether value is in the array
const stateValidator = async (value) => {
  const usStateAbbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL',
    'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT',
    'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
    if (usStateAbbreviations.indexOf(value) === -1) {
      throw new Error("State is invalid");
    }
  };

// Check whether value is in the format 00000 or 00000-0000
const zipCodeValidator = async (value) => {
  const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    if (!zipCodeRegex.test(value)) {
      throw new Error("Zip code is invalid");
    }
  };

// Exactly 4 digits
const yearValidator = async (value) => {
  const yearRegex = /^\d{4}$/;
    if (!yearRegex.test(value)) {
      throw new Error("Year is invalid");
    }
  };

// Check whether value is in the array
const monthValidator = async (value) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (months.indexOf(value) === -1) {
      throw new Error("Month is invalid");
    }
  };

// Exactly 3 digits
const cvvValidator = async (value) => {
  const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(value)) {
      throw new Error("CVV is invalid");
    }
  };

module.exports =  { emailValidator, cityValidator,
   stateValidator, zipCodeValidator, yearValidator, monthValidator, cvvValidator };