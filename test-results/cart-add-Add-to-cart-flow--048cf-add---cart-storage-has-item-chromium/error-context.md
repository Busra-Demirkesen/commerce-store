# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e4]:
    - link "Home" [ref=e5] [cursor=pointer]:
      - /url: /
      - img "Techno Trend" [ref=e6]
    - navigation [ref=e8]:
      - link "Phones" [ref=e9] [cursor=pointer]:
        - /url: /category/cat-phones
      - link "Laptops" [ref=e10] [cursor=pointer]:
        - /url: /category/cat-laptops
    - generic [ref=e12]:
      - button [ref=e13] [cursor=pointer]:
        - img [ref=e14]
      - button "0" [active] [ref=e17] [cursor=pointer]:
        - img [ref=e18]
        - generic [ref=e21]: "0"
      - button [ref=e23] [cursor=pointer]:
        - img [ref=e24]
  - generic [ref=e29]:
    - heading "Shopping Cart" [level=1] [ref=e30]
    - generic [ref=e31]:
      - generic [ref=e32]:
        - paragraph [ref=e33]: No items added to cart
        - list
      - generic [ref=e34]:
        - heading "Order Summary" [level=2] [ref=e35]
        - generic [ref=e37]:
          - generic [ref=e38]: Order Total
          - generic [ref=e39]: $0.00
        - button "Checkout" [disabled] [ref=e40]
  - contentinfo [ref=e41]:
    - paragraph [ref=e43]: © 2025 e-Commerce. All rights reserved.
  - button "Open Next.js Dev Tools" [ref=e49] [cursor=pointer]:
    - img [ref=e50]
  - alert [ref=e53]
```