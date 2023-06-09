class EmailStyle {
  static returnStyle() {
    const style = `<style>
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
    `;

    return style;
  }
}

module.exports = EmailStyle;
