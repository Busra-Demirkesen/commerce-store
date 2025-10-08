


const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const DATA_PATH = path.join(__dirname, '..', 'e2e', 'mock-data.json');

function sendJSON(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function loadData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

const server = http.createServer((req, res) => {
  try {
    const { pathname, query } = url.parse(req.url, true);
    const data = loadData();

    if (req.method !== 'GET') {
      return sendJSON(res, 405, { error: 'Method Not Allowed' });
    }

    if (pathname === '/categories') {
      return sendJSON(res, 200, data.categories);
    }
    const catIdMatch = pathname && pathname.startsWith('/categories/') ? pathname.split('/')[2] : null;
    if (catIdMatch) {
      const cat = data.categories.find(c => c.id === catIdMatch);
      if (!cat) return sendJSON(res, 404, { error: 'Category not found' });
      return sendJSON(res, 200, cat);
    }

    if (pathname === '/billboards') {
      return sendJSON(res, 200, data.billboards);
    }

    if (pathname === '/colors') {
      return sendJSON(res, 200, data.colors);
    }

    if (pathname === '/sizes') {
      return sendJSON(res, 200, data.sizes);
    }

    if (pathname === '/products') {
      let products = data.products;
      if (query.categoryId) {
        products = products.filter(p => p.category.id === query.categoryId);
      }
      if (query.colorId) {
        products = products.filter(p => p.color.id === query.colorId);
      }
      if (query.sizeId) {
        products = products.filter(p => p.size.id === query.sizeId);
      }
      if (query.isFeatured !== undefined) {
        const want = String(query.isFeatured) === 'true';
        products = products.filter(p => p.isFeatured === want);
      }
      if (query.searchTerm) {
        const q = String(query.searchTerm).toLowerCase();
        products = products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q)
        );
      }
      return sendJSON(res, 200, products);
    }

    if (pathname && pathname.startsWith('/products/')) {
      const id = pathname.split('/')[2];
      const product = data.products.find(p => p.id === id);
      if (!product) return sendJSON(res, 404, { error: 'Product not found' });
      return sendJSON(res, 200, product);
    }

    return sendJSON(res, 404, { error: 'Not Found' });
  } catch (e) {
    return sendJSON(res, 500, { error: 'Server Error', detail: String(e && e.message || e) });
  }
});

server.listen(PORT, () => {
  
  console.log(`Mock API listening on http://localhost:${PORT}`);
});
