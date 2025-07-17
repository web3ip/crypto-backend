const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const WalletSchema = new mongoose.Schema({
  address: String,
  connectedAt: { type: Date, default: Date.now },
});
const Wallet = mongoose.model('Wallet', WalletSchema);

app.post('/log-wallet', async (req, res) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ error: 'No address provided' });
  const wallet = new Wallet({ address });
  await wallet.save();
  res.json({ message: 'Wallet logged', address });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));