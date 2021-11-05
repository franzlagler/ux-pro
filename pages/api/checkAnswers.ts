export default function checkAnswers(req, res) {
  if (req.method === 'POST') {
    try {
      const answers = req.body;
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}
