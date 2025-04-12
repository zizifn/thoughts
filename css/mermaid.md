```mermaid
graph TD
    subgraph "Browser Main Thread / Event Loop"
        A[Input Event Occurs (e.g., Click)] --> B{Task Queue};
        B --> C[Process Task: Run JS Event Handler (e.g., onClick)];
        C -- Modifies DOM/Style --> D{Changes Flagged};
        C -- Schedules rAF --> E{rAF Callback Queue};

        F[Check for Next Frame Time] --> G{Run Scheduled rAF Callbacks};
        G -- Modifies DOM/Style --> D;

        H[Process CSS Animations/Transitions] -- Updates Style Values --> D;

        I[Start Rendering Pipeline...] --> J[1. Recalculate Style];
        J -- Determines Final Styles --> K[2. Layout];
        K -- Determines Geometry --> L[3. Paint];
        L -- Creates Paint Records/Textures --> M[4. Compositing];
        M -- Assembles Layers --> N[Frame Displayed on Screen];

        %% Connections showing triggers and skips
        D --> J;  // Changes trigger Style Recalculation
        J -.->|If geometry unchanged| L; // Skip Layout if possible
        K -.->|If visuals unchanged| M; // Skip Paint if possible (rare)

        %% Loop back (conceptual for next frame)
        N --> |Wait for next VSync| F;
    end


```
