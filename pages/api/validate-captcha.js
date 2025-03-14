const secret = process.env.NEXT_SECRET_CAPTCHA

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { token } = req.body;
  
      // Valider le token avec l'API de reCAPTCHA
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        {
          method: 'POST',
        }
      );
  
      const data = await response.json();
  
      if (data.success) {
        res.status(200).json({ success: true });
      } else {
        console.error('Erreurs reCAPTCHA :', data['error-codes']);
        res.status(400).json({ success: false, error: 'Captcha invalide', errorCodes: data});
      }
    } else {
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
  }