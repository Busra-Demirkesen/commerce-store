# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
      - button "0" [ref=e17] [cursor=pointer]:
        - img [ref=e18]
        - generic [ref=e21]: "0"
      - button [ref=e23] [cursor=pointer]:
        - img [ref=e24]
  - generic [ref=e28]:
    - heading "404" [level=1] [ref=e29]
    - heading "This page could not be found." [level=2] [ref=e31]
  - contentinfo [ref=e32]:
    - paragraph [ref=e34]: © 2025 e-Commerce. All rights reserved.
  - button "Open Next.js Dev Tools" [ref=e40] [cursor=pointer]:
    - img [ref=e41]
  - alert [ref=e44]
```