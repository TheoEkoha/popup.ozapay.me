const handler = (req, res) => {
    if (req.method === "POST") {
      try {
        fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=6LdLdP8hAAAAABSYPODLKDL_ToxJBQVXnmd7P0i-&response=${req.body.gRecaptchaToken}`,
        })
          .then((reCaptchaRes) => reCaptchaRes.json())
          .then((reCaptchaRes) => {
            console.log(
              reCaptchaRes,
              "Response from Google reCaptcha verification API"
            );
            if (reCaptchaRes?.score > 0.5) {
              // Save data to the database from here
              res.status(200).json({
                status: "success",
                message: "Enquiry submitted successfully",
              });
            } else {
              res.status(200).json({
                status: "failure",
                message: "Google ReCaptcha Failure",
              });
            }
          });
      } catch (err) {
        res.status(405).json({
          status: "failure",
          message: "Error submitting the enquiry form",
        });
      }
    } else {
      res.status(405);
      res.end();
    }
  };
  
  export default handler;