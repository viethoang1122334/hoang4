import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [gender, setGender] = useState('');
  const [sum, setSum] = useState(null); // State để lưu tổng

  // Hàm tính tổng của hai số
  const calculateSum = () => {
    const num1 = parseFloat(number1) || 0;
    const num2 = parseFloat(number2) || 0;
    setSum(num1 + num2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tính tổng của hai số
    const num1 = parseFloat(number1) || 0;
    const num2 = parseFloat(number2) || 0;
    const totalSum = num1 + num2;

    try {
      const response = await axios.post('https://sheet.best/api/sheets/6dd73639-e035-4f8a-b533-6212d128c462', {
        Name: name,
        Number1: number1,
        Number2: number2,
        Gender: gender,
        Sum: totalSum // Gửi tổng của hai số
      });
      
      console.log(response.data); // Success message

      // Xóa tổng sau khi gửi dữ liệu
      setSum(null);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tên:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Số thứ 1:</label>
        <input type="number" value={number1} onChange={(e) => setNumber1(e.target.value)} required />
      </div>
      <div>
        <label>Số thứ 2:</label>
        <input type="number" value={number2} onChange={(e) => setNumber2(e.target.value)} required />
      </div>
      <div>
        <label>Giới tính:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      <button type="button" onClick={calculateSum}>Tính tổng</button>
      {sum !== null && <p>Tổng là: {sum}</p>}
      <button type="submit">Gửi</button>
    </form>
  );
};

export default FormComponent;
