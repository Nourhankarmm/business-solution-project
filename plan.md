Below is a detailed implementation plan in markdown that covers all frontend files, AI integrations, error handling, and UI/UX best practices. The plan assumes you are using a Next.js (app directory) structure with the provided UI components and that any API keys (e.g. for OpenRouter/OpenAI) will be set via environment variables.

---

### 1. Overall Architecture & AI Features

- **Frontend Only & AI Integration:**  
  - Build the core user flows (authentication, profile creation, campaign request, admin dashboard) in React/Next.js.  
  - Integrate AI components (chatbot assistant, influencer recommendations, engagement prediction, profile enrichment) by exposing helper functions that call a real AI endpoint (e.g. OpenRouter at `https://openrouter.ai/api/v1/chat/completions`) using your provided API key.  
  - Use a default model such as `anthropic/claude-sonnet-4` (internally specified) for all AI requests.

- **Error Handling & Best Practices:**  
  - Wrap all API calls in try/catch blocks.  
  - Display errors using the existing alert UI component (e.g. `src/components/ui/alert.tsx`).  
  - Validate form inputs and provide user feedback for required fields.
  
- **UI/UX Considerations:**  
  - Use clean typography, spacious layouts, and consistent color themes from `globals.css`.  
  - Build pages with modern, stylistic forms and containers (avoid external icon libraries and imagery except using placeholder images with descriptive URLs when needed).  
  - Maintain accessible navigation (semantic HTML, proper aria labels).

---

### 2. File & Component Structure Changes

#### A. Layout and Navigation

- **File:** `src/app/layout.tsx`  
  **Changes:**  
  - Add a top-level navigation bar with text-based links (Home, Login, Register, Profile, Chatbot, Campaign Request, Dashboard).  
  - Use simple `<nav>` and `<a>` elements styled with your global CSS.  
  - Ensure layout components wrap around all pages.

#### B. Home Page

- **File:** `src/app/page.tsx`  
  **Changes:**  
  - Create a landing page that explains the platform’s features (influencer profiles, campaign management, AI assistant).  
  - Present clear CTAs linking to Auth, Profile, AI Chatbot, and Dashboard pages.

#### C. Authentication Pages

- **File:** `src/app/auth/login.tsx`  
  **Changes:**  
  - Build a login form using components from `src/components/ui/form.tsx`, `input.tsx`, and `button.tsx`.  
  - Include fields for email/phone and social login placeholders for Google/FB (styled as text buttons).  
  - Handle errors (invalid credentials simulation) with alert components.

- **File:** `src/app/auth/register.tsx`  
  **Changes:**  
  - Build a registration form with fields for email/phone, password, and a dropdown for role selection (Influencer, Usher, Service Seeker, Admin).  
  - Simulate OAuth/2FA selections and display messages for successful registration.

#### D. Profile Creation (Influencer/Usher)

- **File:** `src/app/profile.tsx`  
  **Changes:**  
  - Provide a form for profile creation that includes fields for bio, services, and categories.  
  - Add an image upload placeholder (simulate AWS S3 upload) with an `<img>` using a placeholder URL such as:  
  ```
  <img src="https://placehold.co/400x300?text=Influencer+profile+picture" alt="Placeholder image for influencer profile picture" onerror="this.onerror=null; this.src='fallback.png'" />
  ```  
  - Integrate the calendar from `src/components/ui/calendar.tsx` to allow the user to select availability dates.  
  - Provide a section to input social media handles with a “Fetch Metrics” button that triggers AI validation (see AI integration below).

#### E. Campaign Request

- **File:** `src/app/campaign-request.tsx`  
  **Changes:**  
  - Implement a multi-step form (using UI components like accordion or tabs if needed) to capture campaign objectives, budget, timeline, and target audience.  
  - Validate each step and simulate submission with proper error messages.

#### F. Admin Dashboard

- **File:** `src/app/dashboard.tsx`  
  **Changes:**  
  - Create an admin dashboard page displaying user management (CRUD lists), subscription details, payment reports, and analytics.  
  - Use table components (from `src/components/ui/table.tsx`) and simple charts (use custom styled divs/charts as placeholders) to show stats.  
  - Ensure restricted access by simulating role-based control (show admin-only information).

---

### 3. AI Integration Components & Utilities

#### A. AI Chatbot Component

- **File:** `src/components/AiChatbot.tsx`  
  **Changes:**  
  - Build a chat interface with a conversation window, text input, and submit button.  
  - Use state to handle conversation history and display responses.  
  - On submit, call an API helper function (see below) to get the chatbot response and update messages.  
  - Ensure error handling (display error using your alert component).

#### B. Recommendation Engine Component

- **File:** `src/components/RecommendationEngine.tsx`  
  **Changes:**  
  - Create a form to capture campaign parameters (objective, budget, category).  
  - Upon submission, call a utility function to request influencer recommendations.  
  - Display results in a clean, card-based layout with details like name, follower count, etc.

#### C. Engagement Prediction Component

- **File:** `src/components/EngagementPrediction.tsx`  
  **Changes:**  
  - Provide input fields for influencer data.  
  - On button click, call an AI function to predict campaign KPIs (e.g. expected engagement).  
  - Show predictions in a modern card with error handling.

#### D. AI API Helper Functions

- **File:** `src/lib/aiAPI.ts`  
  **Changes:**  
  - Create functions such as:
  ```typescript
  export async function getChatbotResponse(prompt: string): Promise<string> {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "anthropic/claude-sonnet-4",
          messages: [
            { role: "user", content: [{ type: "text", text: prompt }] }
          ]
        })
      });
      if (!res.ok) throw new Error("Failed to fetch AI response.");
      const data = await res.json();
      return data?.choices?.[0]?.message?.content || "";
    } catch (error) {
      throw error;
    }
  }
  ```
  - Add similar functions for `getRecommendations` and `getEngagementPrediction` that accept campaign data and influencer metrics respectively.
  - Ensure each function uses try/catch and returns errors to the UI.

---

### 4. UI/UX Styling & Error Handling

- **Styling:**  
  - All forms, cards, and dashboards should use consistent spacing, borders, and rounded corners.  
  - Use simple text-based buttons and links (no external icon libraries).  
  - When images are required (e.g. profile picture upload), use `<img>` tags with placeholder URLs such as:  
  ```
  <img src="https://placehold.co/400x300?text=Profile+Picture+Placeholder" alt="Profile picture placeholder with detailed description of influencer's photo preview" onerror="this.onerror=null; this.src='fallback.png'" />
  ```

- **Error Handling:**  
  - Each API call in `aiAPI.ts` must catch errors and throw them to be displayed by the calling component.  
  - In each component (e.g. AiChatbot), maintain a local error state that renders an alert (using `src/components/ui/alert.tsx`).  
  - Validate form inputs with immediate error messages preceding any API call.

---

### 5. Integration & Testing

- **Integration:**  
  - Ensure that each page (Auth, Profile, Dashboard, Campaign Request, AI components) is accessible via the navigation.  
  - The AI components call the respective functions from `aiAPI.ts` and update the UI based on promise resolution.  
  - Simulate role-based access in frontend (e.g., only allow admin users to navigate to the dashboard).

- **Testing:**  
  - Manually test each form component for proper validation and error messaging.  
  - Use browser console logging and visual inspection to verify API responses.  
  - Optionally, execute sample curl commands against any local API routes (if created later) but for now test functionality within the browser.

---

### Summary

- A new layout in `src/app/layout.tsx` is implemented with a navigation bar linking to Home, Login, Register, Profile, Chatbot, Campaign Request, and Dashboard.  
- Auth pages (`login.tsx`, `register.tsx`) and a profile creation page (`profile.tsx`) are built using existing UI components with form validation and error alerts.  
- Dedicated components for AI integrations—`AiChatbot.tsx`, `RecommendationEngine.tsx`, and `EngagementPrediction.tsx`—call utility functions in `src/lib/aiAPI.ts` to fetch data from a real AI provider.  
- The admin dashboard (`dashboard.tsx`) and campaign request page simulate full-featured real-world functionality using modern design practices.  
- Consistent error handling with try/catch and alert dialogs ensures a robust user experience, while secure API key management is assumed via environment variables.
