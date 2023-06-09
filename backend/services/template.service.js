/**
 * Class for Cart Services
 */
class TemplateService {
  /**
   * Function to return a single item from cart of a particular user
   * @param {ObjectId} userId
   * @param {String} title
   * @returns {Object} the item from the cart collection
   */
  static async userTemplate(name, userEmail, totalPrice, tableData) {
    const tableTemplate = `
          ${tableData.map(item => `
          <tr>
          <td>${item.Title}</td>
          <td>${item.Author}</td>
          <td>${item.Quantity}</td>
          <td>${item.Price}</td>
          </tr>
          `).join("")}
      `;
    const template = `<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <title>Document</title>
    <style>
        .header {
            font-weight: 700;
            text-align: center;
            padding: 24px;
            background-color: #f7f7f7;
            color: #333638;
        }

        table {
            border: 1px solid #fff;
            border-collapse: collapse;
            margin: 0;
            padding: 0;
            width: 100%;
            table-layout: fixed;
            overflow: auto;
            color: #646f87;
            margin-bottom: 20px;
        }

        table tr {
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 0.35em;
            font-weight: 600;
        }

        table tbody tr:hover {
            background-color: #ddcfe8;
            cursor: pointer;
        }

        table th, table td {
            padding: 0.625em;
            text-align: center;
            font-weight: 600;
        }

        table div {
            margin: auto;
        }

        table th {
            font-weight: 800;
            font-size: 0.85em;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }

        table thead {
            position: sticky;
            top: 0;
            z-index: 1;
        }

        .cartTotal {
            color: #fff;
            background-color: #6f5cc4;
            /* border: 1px solid #6f5cc4; */
            text-align: center;
            padding: 10px;
            width: 20%;
            border-radius: 0.375rem;
            font-weight: 500;
            display: block;
            margin-left: auto;
            margin-bottom: 10px;
        }

        h3, h4, p {
            font-weight: 700;
            color: #646f87;
            font-size: 1.1rem;
        }

        p {
            font-weight: 700;
            font-size: 1.1rem;
        }

        .footer {
            font-weight: 700;
            text-align: center;
            padding: 24px;
            background-color: #f7f7f7;
            position: absolute;
            width: 100%;
            bottom: 0;
            color: #333638;
        }
    </style>
</head>

<body>
    <h3 class="header">
        Book App
    </h3>
    <div class="container">
        <h3>
            Hi ${name},
        </h3>
        <p>
            ${name} (${userEmail}) placed an order of Rs. ${totalPrice}
        </p>
        <div>
            <span class="cartTotal">Purchase Amount: Rs. ${totalPrice}</span>
        </div>
        <table class="table-responsive">
        <thead>
        <tr>
        <th scope="col">Title</th>
        <th scope="col">Author</th>
        <th scope="col">Quantity</th>
        <th scope="col">Price</th>
        </tr>
        </thead>
        <tbody>
            ${tableTemplate}
        </tbody>
        </table>
        <p>Purchase Successful</p>
        <p class="mb-0">Yours Truly,</p>
        <p>Book App</p>
    </div>
    <footer class="footer">
        <div class="container">
            <span class="text-muted">© 2023 Book App. All rights reserved.</span>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"
        integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS"
        crossorigin="anonymous"></script>
</body>`;
return template;
  }
}

module.exports = TemplateService;
