import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * Testy pro API route /api/contact.
 * Testujeme validaci, honeypot a úspěšný submit.
 *
 * Importujeme přímo handler – Next.js route handler je standardní async funkce.
 */

// Mock console.log aby testy netlačily do výstupu
beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
});

// Importujeme POST handler
import { POST } from "@/app/api/contact/route";

/** Helper pro vytvoření Request objektu */
function createRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("přijme validní zprávu", async () => {
    const req = createRequest({
      name: "Jan Novák",
      email: "jan@example.com",
      message: "Ahoj, mám dotaz na vaše menu a otevírací dobu.",
      website: "",
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it("odmítne krátké jméno", async () => {
    const req = createRequest({
      name: "J",
      email: "jan@example.com",
      message: "Ahoj, mám dotaz na vaše menu.",
      website: "",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toContain("jméno");
  });

  it("odmítne neplatný e-mail", async () => {
    const req = createRequest({
      name: "Jan Novák",
      email: "neplatny-email",
      message: "Ahoj, mám dotaz na vaše menu.",
      website: "",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toContain("e‑mail");
  });

  it("odmítne příliš krátkou zprávu", async () => {
    const req = createRequest({
      name: "Jan Novák",
      email: "jan@example.com",
      message: "Ahoj",
      website: "",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toContain("krátká");
  });

  it("tiše akceptuje honeypot spam (200 bez uložení)", async () => {
    const req = createRequest({
      name: "Spammer",
      email: "spam@bot.com",
      message: "Buy our products now!!!",
      website: "http://spam.com", // honeypot vyplněný = spam
    });

    const res = await POST(req);
    // Vrátíme 200, abychom nedali spammerovi info
    expect(res.status).toBe(200);
  });

  it("odmítne nevalidní JSON", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "invalid json{{{",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
