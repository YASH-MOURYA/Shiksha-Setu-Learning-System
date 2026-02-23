import { motion } from 'framer-motion';
import { useState } from 'react';
import { CreditCard, Lock, CheckCircle, X } from 'lucide-react';
import { Button, Input, Modal } from '@components/ui';
import { bookingAPI } from '@api/services';
import { useAuthStore } from '@store/authStore';
import toast from 'react-hot-toast';

const PaymentModal = ({ isOpen, onClose, course, onSuccess }) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState('payment'); // 'payment', 'processing', 'success'
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: ''
  });

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentStep('processing');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create booking after successful payment
      const bookingData = {
        courseId: course.id,
        studentId: user.id,
        bookingAmount: course.fee || course.coursePrice,
        bookingStatus: 'Confirmed'
      };

      const response = await bookingAPI.createBooking(bookingData);
      
      if (response.data?.success) {
        setPaymentStep('success');
        toast.success('Payment successful! You are now enrolled in the course.');
        
        // Call success callback after a delay
        setTimeout(() => {
          onSuccess && onSuccess();
          onClose();
          setPaymentStep('payment');
        }, 2000);
      } else {
        throw new Error('Booking creation failed');
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setPaymentStep('payment');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setPaymentForm(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const renderPaymentForm = () => (
    <form onSubmit={handlePayment} className="space-y-6">
      {/* Course Summary */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 mb-2">{course?.name || course?.courseName}</h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Course Price:</span>
          <span className="text-2xl font-bold text-primary-600">${course?.fee || course?.coursePrice}</span>
        </div>
      </div>

      {/* Payment Form */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-primary-500" />
          <span className="font-semibold">Payment Information</span>
          <Lock className="w-4 h-4 text-green-500" />
        </div>

        <Input
          label="Cardholder Name"
          name="cardholderName"
          value={paymentForm.cardholderName}
          onChange={handleInputChange}
          placeholder="John Doe"
          required
        />

        <Input
          label="Card Number"
          name="cardNumber"
          value={paymentForm.cardNumber}
          onChange={handleInputChange}
          placeholder="1234 5678 9012 3456"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry Date"
            name="expiryDate"
            value={paymentForm.expiryDate}
            onChange={handleInputChange}
            placeholder="MM/YY"
            required
          />
          <Input
            label="CVV"
            name="cvv"
            value={paymentForm.cvv}
            onChange={handleInputChange}
            placeholder="123"
            required
          />
        </div>

        <Input
          label="Billing Address"
          name="billingAddress"
          value={paymentForm.billingAddress}
          onChange={handleInputChange}
          placeholder="123 Main St, City, State"
          required
        />
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center gap-2 text-green-700">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">Secure Payment</span>
        </div>
        <p className="text-sm text-green-600 mt-1">
          Your payment information is encrypted and secure.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          loading={loading}
          icon={CreditCard}
        >
          Pay ${course?.fee || course?.coursePrice}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  const renderProcessing = () => (
    <div className="text-center py-8">
      <div className="animate-spin w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment...</h3>
      <p className="text-gray-600">Please wait while we process your payment securely.</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <CheckCircle className="w-8 h-8 text-white" />
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
      <p className="text-gray-600 mb-4">
        You have successfully enrolled in <strong>{course?.name || course?.courseName}</strong>
      </p>
      <p className="text-sm text-green-600">
        You can now access the course from your dashboard.
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={paymentStep === 'processing' ? undefined : onClose}
      title={
        paymentStep === 'payment' ? 'Complete Payment' :
        paymentStep === 'processing' ? 'Processing...' :
        'Payment Complete'
      }
      size="lg"
    >
      {paymentStep === 'payment' && renderPaymentForm()}
      {paymentStep === 'processing' && renderProcessing()}
      {paymentStep === 'success' && renderSuccess()}
    </Modal>
  );
};

export default PaymentModal;