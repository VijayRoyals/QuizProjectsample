// import React, { useState } from 'react';
// // import './AddVoucher.css'; // Import the CSS file

// const AddVoucher = () => {
//   const [voucherCode, setVoucherCode] = useState('');

//   const handleChange = (e) => {
//     setVoucherCode(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic
//     console.log('Voucher code submitted:', voucherCode);
//   };

//   return (
//     <div className="add-voucher-container">
//         <br/>
//       <h2 className="add-voucher-title">Add Voucher</h2>
//       <br/>
//       <form onSubmit={handleSubmit} className="add-voucher-form">
//         <div className="form-group">
//           <label htmlFor="voucher-code">Voucher Code:</label>
//           <input
//             type="text"
//             id="voucher-code"
//             name="voucher-code"
//             value={voucherCode}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <button type="submit" className="btn">Submit</button>
//       </form>
//       <br/>
//     </div>
//   );
// };

// export default AddVoucher;









import React, { useState } from 'react';
import useFetch from '../hooks/voucherFetch'; // Correct import
// import './AddVoucher.css'; // Import the custom CSS file

const AddVoucher = () => {
  const [code, setCode] = useState('');
  const [requestUrl, setRequestUrl] = useState('');
  const [requestBody, setRequestBody] = useState(null);
  const { data, isPending, error } = useFetch(requestUrl, 'POST', requestBody);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestUrl('http://localhost:8000/api/vouchers/');
    setRequestBody({ code });
  };

  return (
    <div className="add-voucher-container">
      <h2 className="add-voucher-title">Add Voucher</h2>
      {error && <p className="error">{error}</p>}
      {data && !error && <p className="success">Voucher added successfully!</p>}
      <form onSubmit={handleSubmit} className="add-voucher-form">
        <div className="form-group">
          <label htmlFor="voucherCode">Voucher Code:</label>
          <input
            type="text"
            id="voucherCode"
            value={code}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddVoucher;

