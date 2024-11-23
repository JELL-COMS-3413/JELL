import React, { useState, useEffect } from "react"; 
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import styles from "./styles/styles"; // Import your styles

export default function CalculatorModal({ calculator }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(""); // State for modal content
    const [selectedCalculation, setSelectedCalculation] = useState(null); // State for selected calculation
    const [formData, setFormData] = useState([]);
    const [result, setResult] = useState(""); // State to store the result of the calculation


    const openModal = (Calc) => {
        let content = "";
        let fields = [];

        //Define fields for each calculation type
        switch (Calc.title) {
            case "Amortized Loan":
                content = "An amortized loan is a type of loan where the borrower makes regular, equal payments over a set period, with each payment covering both interest and a portion of the principal, gradually reducing the loan balance to zero.";
                fields = [
                    { id: '1', label: 'Loan Amount', value: '' },
                    { id: '2', label: 'Annual Interest Rate', value: '' },
                    { id: '3', label: 'Loan Term (years)', value: '' },
                    { id: '4', label: 'Number of Payments Per Year', value: '' },
                ];
                break;
            case "Deferred Payment Loan":
                content = "A deferred payment loan is a type of loan where the borrower is allowed to delay payments on the principal, interest, or both for a specified period, often incurring additional interest that accrues during the deferral period.";
                fields = [
                    { id: '1', label: 'Loan Amount', value: '' },
                    { id: '2', label: 'Annual Interest Rate', value: '' },
                    { id: '3', label: 'Loan Term (years)', value: '' },
                    { id: '4', label: 'Number of Payments Per Year', value: '' },
                    { id: '5', label: 'Deferral Period (years)', value: '' },  // New field
                ];
                break;
            case "Bond":
                content = "A bond is a fixed-income financial instrument where an investor lends money to a borrower (typically a corporation or government) for a defined period at a fixed interest rate, receiving periodic interest payments and the principal back at maturity.";
                fields = [
                    { id: '1', label: 'Face Value', value: '' },
                    { id: '2', label: 'Coupon Rate', value: '' },
                    { id: '3', label: 'Yield', value: '' },
                    { id: '4', label: 'Years to Maturity', value: '' },
                    { id: '5', label: 'Coupon Frequency', value: '' },
                ];
                break;
            case "Mortgage":
                content = "A mortgage is a type of loan used to purchase real estate, where the property itself serves as collateral, and the borrower repays the loan in regular installments of principal and interest over a set term, typically 15 to 30 years.";
                fields = [
                    { id: '1', label: 'Loan Amount', value: '' },
                    { id: '2', label: 'Annual Interest Rate', value: '' },
                    { id: '3', label: 'Loan Term (years)', value: '' },
                    { id: '4', label: 'Number of Payments Per Year', value: '' },
                ];
                break;
            case "Auto Loan":
                content = "An auto loan is a secured loan used to purchase a vehicle, where the vehicle serves as collateral, and the borrower repays the loan through fixed installments of principal and interest over a specified term, typically ranging from 3 to 7 years.";
                fields = [
                    { id: '1', label: 'Loan Amount', value: '' },
                    { id: '2', label: 'Annual Interest Rate', value: '' },
                    { id: '3', label: 'Loan Term (years)', value: '' },
                    { id: '4', label: 'Number of Payments Per Year', value: '' },
                    { id: '5', label: 'Down Payment', value: '' }, // Optional down payment field
                ];
                break;
            case "Student Loan":
                content = "A student loan is a type of loan designed to help students pay for education-related expenses, such as tuition, books, and living costs, often with flexible repayment terms and options for deferment while the borrower is in school.";
                fields = [
                    { id: '1', label: 'Loan Amount', value: '' },
                    { id: '2', label: 'Annual Interest Rate', value: '' },
                    { id: '3', label: 'Loan Term (years)', value: '' },
                    { id: '4', label: 'Number of Payments Per Year', value: '' },
                    { id: '5', label: 'Grace Period (months)', value: '' },  // Add Grace Period
                ];
                break;
            case "Mortgage Payoff":
                content = "Mortgage payoff refers to the process of fully repaying the remaining balance on a mortgage loan, either through regular payments over the loan term or by making a lump sum payment to settle the debt earlier than scheduled.";
                break;
            case "Savings":
                content = "Savings refers to the portion of income that is set aside and not spent, often deposited in a financial institution like a bank or credit union, where it may earn interest over time to help build wealth or provide funds for future needs.";
                break;
            case "Simple Interest":
                content = "Simple interest is a method of calculating interest where the interest is only applied to the principal amount for the duration of the loan or investment, rather than on the accumulated interest.";
                break;
            case "Compound Interest":
                content = "Compound interest is a method of calculating interest where the interest is added to the principal at regular intervals, and future interest is calculated on the new, larger principal, leading to interest being earned on both the initial principal and the accumulated interest";
                break;
            case "Certificate of Deposit":
                content = "A Certificate of Deposit (CD) is a type of savings account offered by banks or credit unions that pays a fixed interest rate for a specified term, with the principal and interest returned to the depositor at maturity. Early withdrawal usually incurs a penalty.";
                break;
            case "IRAs":
                content = "An IRA (Individual Retirement Account) is a tax-advantaged savings account designed to help individuals save for retirement.";
                break;
            case "401K":
                content = "A 401(k) is a retirement savings plan offered by employers, allowing employees to contribute a portion of their salary on a pre-tax basis, with potential employer matching, and tax-deferred growth until withdrawals are made in retirement.";
                break;
            case "Social Security":
                content = "Social Security is a government program that provides financial assistance to retirees, disabled individuals, and survivors of deceased workers, funded through payroll taxes, with benefits based on an individual's earnings history.";
                break;
            default:
                content = "No content available";
        }
        setIsModalVisible(true);
        setSelectedCalculation(Calc);
        setModalContent(content);
        setFormData(fields);
        setResult(""); // Clear the result when a new modal is opened
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedCalculation(null);
        setModalContent("");
        setFormData([]); // clear form data when closing modal
        setResult(""); // Clear the result
    };

    const handleInputChange = (id, value) => {
        // Ensure that only numeric values (integer or float) are accepted
        if (/^\d*\.?\d*$/.test(value)) {
            setFormData(prevData =>
                prevData.map(field =>
                    field.id === id ? { ...field, value: value } : field
                )
            );
        }
    };

    const calculateResult = () => {
        // Create a new object with parsed values to avoid overwriting existing variables
        const formValues = formData.reduce((acc, field) => {
        const parsedValue = parseFloat(field.value);
        if (isNaN(parsedValue)) {
            acc[field.label] = null; // Mark invalid input as null
        } else {
            acc[field.label] = parsedValue; // Parse valid inputs
        }
        return acc;
    }, {});

        let calculationResult = null;
        // Add condition to check for missing or invalid values
        if (Object.values(formValues).includes(null)) {
            calculationResult = "Invalid input values. Please check your inputs.";
        } else {
        // Now that we have valid form values, perform calculations based on calculation type
        switch (selectedCalculation.title) {
            case "Amortized Loan": {
                const {
                    "Loan Amount": loanAmount,
                    "Annual Interest Rate": annualRate,
                    "Loan Term (years)": loanTerm,
                    "Number of Payments Per Year": paymentsPerYear,
                } = formValues;
    
                // Ensure all necessary values are provided and valid
                if (
                    !isNaN(loanAmount) &&
                    !isNaN(annualRate) &&
                    !isNaN(loanTerm) &&
                    !isNaN(paymentsPerYear) &&
                    paymentsPerYear > 0 &&
                    loanTerm > 0
                ) {
                    const monthlyRate = annualRate / 100 / paymentsPerYear; // Monthly interest rate
                    const totalPayments = loanTerm * paymentsPerYear; // Total number of payments
    
                    // Amortization formula
                    calculationResult =
                        (loanAmount * monthlyRate) /
                        (1 - Math.pow(1 + monthlyRate, -totalPayments));
    
                    calculationResult = calculationResult.toFixed(2); // Round to 2 decimal places
                } else {
                    calculationResult = "Invalid input values. Please check your inputs.";
                }
                break;
            }
            case "Deferred Payment Loan":
                const {
                    "Loan Amount": loanAmount1,
                    "Annual Interest Rate": annualRate1,
                    "Loan Term (years)": loanTerm1,
                    "Number of Payments Per Year": paymentsPerYear1,
                    "Deferral Period (years)": deferralPeriod,
                } = formValues;
    
                // Ensure all necessary values are provided and valid
                if (
                    !isNaN(loanAmount1) &&
                    !isNaN(annualRate1) &&
                    !isNaN(loanTerm1) &&
                    !isNaN(paymentsPerYear1) &&
                    !isNaN(deferralPeriod) &&
                    paymentsPerYear1 > 0 &&
                    loanTerm1 > 0 &&
                    deferralPeriod >= 0
                ) {
                    // Monthly rate
                    const monthlyRate = annualRate1 / 100 / paymentsPerYear1;
                    const totalMonths = loanTerm1 * paymentsPerYear1;
                    const deferralMonths = deferralPeriod * 12;
    
                    // Interest accrued during deferral period
                    const interestAccrued = loanAmount1 * monthlyRate * deferralMonths;
                    const newLoanBalance = loanAmount1 + interestAccrued; // New loan balance after deferral
    
                    // Total number of payments remaining (after deferral)
                    const totalPaymentsAfterDeferral = totalMonths - deferralMonths;
    
                    // Calculate the new monthly payment after deferral
                    calculationResult =
                        (newLoanBalance * monthlyRate) /
                        (1 - Math.pow(1 + monthlyRate, -totalPaymentsAfterDeferral));
    
                    calculationResult = calculationResult.toFixed(2); // Round to 2 decimal places
                } else {
                    calculationResult = "Invalid input values. Please check your inputs.";
                } 
            break;
            case "Bond":
                const {
                    "Face Value": faceValue,
                    "Coupon Rate": couponRate,
                    "Yield": yieldRate,
                    "Years to Maturity": yearsToMaturity,
                    "Coupon Frequency": couponFrequency,
                } = formValues;
    
                // Ensure all necessary values are provided and valid
                if (
                    !isNaN(faceValue) &&
                    !isNaN(couponRate) &&
                    !isNaN(yieldRate) &&
                    !isNaN(yearsToMaturity) &&
                    !isNaN(couponFrequency) &&
                    faceValue > 0 &&
                    couponRate > 0 &&
                    yieldRate > 0 &&
                    yearsToMaturity > 0 &&
                    couponFrequency > 0
                ) {
                    const couponPayment = (faceValue * (couponRate / 100)) / couponFrequency; // Coupon payment per period
                    const periods = yearsToMaturity * couponFrequency; // Total number of periods
                    const ratePerPeriod = yieldRate / 100 / couponFrequency; // Yield per period
    
                    // Calculate the bond price
                    let bondPrice = 0;
    
                    // Present value of coupon payments (PV of annuity)
                    for (let t = 1; t <= periods; t++) {
                        bondPrice += couponPayment / Math.pow(1 + ratePerPeriod, t);
                    }
    
                    // Present value of the face value (lump sum at maturity)
                    bondPrice += faceValue / Math.pow(1 + ratePerPeriod, periods);
    
                    calculationResult = bondPrice.toFixed(2); // Round to 2 decimal places
                } else {
                    calculationResult = "Invalid input values. Please check your inputs.";
                }
                break;
            case "Mortgage":
                const { "Loan Amount": loanAmount, "Annual Interest Rate": annualRate, "Loan Term (years)": loanTerm, "Number of Payments Per Year": paymentsPerYear } = formValues;

                 if (loanAmount && annualRate && loanTerm && paymentsPerYear) {
                     const monthlyRate = annualRate / 100 / paymentsPerYear;
                     const totalPayments = loanTerm * paymentsPerYear;
                     const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
                     calculationResult = monthlyPayment.toFixed(2);
                 } else {
                     calculationResult = "Invalid input values. Please check your inputs.";
                 }
                break;
            case "Auto Loan":
                const { 
                    "Loan Amount": loanAmount2,
                    "Annual Interest Rate": annualRate2,
                    "Loan Term (years)": loanTerm2,
                    "Number of Payments Per Year": paymentsPerYear2,
                    "Down Payment": downPayment, // Optional field for down payment
                } = formValues;
            
                // Ensure all necessary values are provided and valid
                if (
                    !isNaN(loanAmount2) &&
                    !isNaN(annualRate2) &&
                    !isNaN(loanTerm2) &&
                    !isNaN(paymentsPerYear2) &&
                    loanAmount2 > 0 &&
                    annualRate2 >= 0 &&
                    loanTerm2 > 0 &&
                    paymentsPerYear2 > 0
                ) {
                    // If down payment exists, subtract it from the loan amount
                    const loanPrincipal = downPayment ? loanAmount2 - downPayment : loanAmount2;
            
                    // Monthly interest rate
                    const monthlyRate = annualRate2 / 100 / 12; // Annual rate divided by 12 months
                    const totalPayments = loanTerm2 * paymentsPerYear2; // Total number of payments
            
                    // Calculate the monthly payment using the amortization formula
                    const monthlyPayment = (loanPrincipal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
            
                    calculationResult = monthlyPayment.toFixed(2); // Round to 2 decimal places
                } else {
                    calculationResult = "Invalid input values. Please check your inputs.";
                }
                break;
            case "Student Loan": 
                const {
                        "Loan Amount": loanAmount3,
                        "Annual Interest Rate": annualRate3,
                        "Loan Term (years)": loanTerm3,
                        "Number of Payments Per Year": paymentsPerYear3,
                        "Grace Period (months)": gracePeriod,
                    } = formValues;
                
                    // Ensure all necessary values are provided and valid
                if (
                    !isNaN(loanAmount3) &&
                    !isNaN(annualRate3) &&
                    !isNaN(loanTerm3) &&
                    !isNaN(paymentsPerYear3) &&
                    !isNaN(gracePeriod) &&
                    loanAmount3 > 0 &&
                    annualRate3 > 0 &&
                    loanTerm3 > 0 &&
                    paymentsPerYear3 > 0 &&
                    gracePeriod >= 0
                ) {
                    const monthlyRate = annualRate3 / 100 / paymentsPerYear3; // Monthly interest rate
                    const totalPayments = loanTerm3 * paymentsPerYear3; // Total number of payments
                    const gracePayments = gracePeriod * paymentsPerYear3; // Number of payments during grace period
                
                    // The loan starts accruing interest during the grace period, so we calculate the loan balance at the end of the grace period
                    const loanWithGrace = loanAmount3 * Math.pow(1 + monthlyRate, gracePayments);
                
                    // Calculate the monthly payment based on the new loan balance (after grace period)
                    const monthlyPayment =
                        (loanWithGrace * monthlyRate) / (1 - Math.pow(1 + monthlyRate, - (totalPayments - gracePayments)));
                
                    calculationResult = monthlyPayment.toFixed(2); // Round to 2 decimal places
                    } else {
                        calculationResult = "Invalid input values. Please check your inputs.";
                    }
                break;
            case "Mortgage Payoff":
                calculationResult = "Mortgage Payoff result"; // Placeholder
                break; 
            case "Savings":
                calculationResult = "Savings result"; // Placeholder
                break;
            case "Simple Interest":
                calculationResult = "Simple Interest result"; // Placeholder
                break;
            case "Compound Interest":
                calculationResult = "Compound Interest result"; // Placeholder
                break;
            case "Certificate of Deposit":
                calculationResult = "Certificate of Deposit result"; // Placeholder
                break;
            case "IRAs":
                calculationResult = "IRAs result"; // Placeholder
                break; 
            case "401K":
                calculationResult = "401K result"; // Placeholder
                break;
            case "Social Security":
                calculationResult = "Social Security result"; // Placeholder
                break;  
            default:
                calculationResult = "Invalid calculation type";
        }
    }
        setResult(calculationResult); // Set the result state
    };
    

    const renderItem = ({ item }) => (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{item.label}</Text>
            <TextInput
                style={styles.inputField}
                value={item.value}
                onChangeText={text => handleInputChange(item.id, text)} // Handle input change
                keyboardType="numeric" // Ensure numeric keyboard is shown
                placeholder="Enter value"
            />
        </View>
    );

    return (
        <View>
            <TouchableOpacity
                onPress={() => openModal(calculator)} // Pass calculator here to openModal
                style={styles.listItem}
            >
                <Text style={{ fontFamily: "LouisGeorgeCafe", fontSize: 16 }}>
                    {calculator.title} {/* Access title directly from calculator */}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <SafeAreaView style={additionalStyles.modalContainer}>
                    <Text style={additionalStyles.modalHeaderText}>
                        {selectedCalculation?.title} {/* Access title from selectedCalculation */}
                    </Text>
                    <Text style={additionalStyles.modalContentText}>
                        {modalContent} {/* Display modalContent */}
                    </Text>
                    <FlatList
                        data={formData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                    {/* Display calculation result */}
                    {result && (
                        <Text style={additionalStyles.resultText}>
                            Calculation Result: {result}
                        </Text>
                    )}

                    {/* Submit and Back buttons */}
                    <View style={additionalStyles.buttonContainer}>
                        <Button title="Back" onPress={closeModal} />
                        <Button title="Submit" onPress={calculateResult} />
                    </View>

                    
                </SafeAreaView>
            </Modal>
        </View>
    );
}
const additionalStyles = StyleSheet.create({
    modalContainer: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#fff", 
    }, 
    modalHeaderText: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 20, 
    }, 
    modalContentText: { 
        fontSize: 16, 
        marginBottom: 20, 
        textAlign: "center",
    },
    inputContainer: {
        width: '80%',
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    inputField: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        paddingLeft: 8,
        borderRadius: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
    },
    resultText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        color: 'green',
    }
});

Object.assign(styles, additionalStyles);