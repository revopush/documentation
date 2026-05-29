# Billing & Payments

Revopush uses a monthly subscription model. This page explains when and how you are charged.

---

## Billing Cycle Overview

```
         Subscribe                  1st of month          1st of month
         mid-month                  (Billing Day)         (Billing Day)
             │                           │                     │
 ────────────┼───────────────────────────┼─────────────────────┼──────────▶
  Month N    │◄──── remaining days ─────▶│◄──── Month N+1 ────▶│  Month N+2
             │                           │                     │
             ▼                           ▼                     ▼
      Pro-rated charge           ① Subscription fee    ① Subscription fee
      for remaining days            for next month         for next month
      of current month
                                  ② Overage fee         ② Overage fee
                                  (if any) from          (if any) from
                                  previous month         previous month
                                  [within 1st week]      [within 1st week]
```

---

## How Charges Work

### 1. Subscription Start — Pro-rated Charge

When you subscribe mid-month, you pay only for the **remaining days** of that month.

> **Formula:** `Monthly Price × (Remaining Days ÷ Days in Month)`

| Subscribe on | Days remaining | $25 plan charge |
|---|---|---|
| 1st (first day) | 31/31 | $25.00 |
| 15th | 17/31 | $13.71 |
| 25th | 7/31 | $5.65 |

---

### 2. Monthly Subscription — Charged on the 1st

On the **1st of every month**, you are charged the full plan price for the **upcoming month**.

All customers are billed on the same date regardless of when they originally subscribed.

---

### 3. Overage Charges — First Week of the Month

If your usage exceeded plan limits in the previous month (Egress and/or MAU), the overage fee is charged during the **first week of the new month**.

::: warning Monitor your usage
To avoid unexpected overage charges, review your consumption at **[app.revopush.org/billing](https://app.revopush.org/billing)** before the end of each month.
:::

---

### 4. Usage Limit Email Notification

When you hit your plan limits during the month, Revopush sends an email:

> **"Notice: Monthly usage limit exceeded for Revopush"**

The email details which resource (Egress or MAU) was exceeded. At that point you can:

- **Upgrade your plan** before month-end to increase your limits
- **Stay on your current plan** and pay the overage charge at the start of next month

---

## Cost Calculation Examples

### Example 1 — Subscribe on the 1st, no overage

> Plan: **$25/month** · Subscribe: **February 1st**

| Date | Charge | Reason |
|---|---|---|
| Feb 1 | $25.00 | February subscription |
| Mar 1 | $25.00 | March subscription |
| **Total (2 months)** | **$50.00** | |

---

### Example 2 — Subscribe mid-month, no overage

> Plan: **$25/month** · Subscribe: **January 15th** (17 of 31 days remaining)

| Date | Charge | Reason |
|---|---|---|
| Jan 15 | $13.71 | Pro-rated (17/31 × $25) |
| Feb 1 | $25.00 | February subscription |
| Mar 1 | $25.00 | March subscription |
| **Total (first 2.5 months)** | **$63.71** | |

---

### Example 3 — Subscribe mid-month, with overage in first full month

> Plan: **$25/month** · Subscribe: **January 15th** · Overage in February: **$8.00**

| Date | Charge | Reason |
|---|---|---|
| Jan 15 | $13.71 | Pro-rated (17/31 × $25) |
| Feb 1 | $25.00 | February subscription |
| Mar 1 | $25.00 | March subscription |
| Mar 1 | $8.00 | February overage (Egress/MAU exceeded) |
| **Total** | **$71.71** | |

::: tip
Overage charges are based on actual usage above the plan limit. Check your current plan limits and overage rates at [app.revopush.org/billing](https://app.revopush.org/billing).
:::