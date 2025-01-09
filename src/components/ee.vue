<template>
  <div class="terminal-overlay">
    <div class="terminal-window">
      <div class="terminal-header">
        <span>DOS-Dae v1.4.2</span>
        <button @click="$emit('close')" class="close-btn">×</button>
      </div>
      <div class="terminal-content" ref="terminalContent">
        <div class="output-container">
          <div
            v-for="(line, index) in outputLines"
            :key="index"
            class="output-line"
          >
            {{ line }}
          </div>
        </div>
        <div class="input-line">
          <span class="prompt">{{ currentPath }}></span>
          <input
            v-model="currentInput"
            @keyup.enter="handleCommand"
            @keydown.tab.prevent="handleTab"
            ref="commandInput"
            type="text"
            autocomplete="off"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useEE } from "../stores/ee";
export default {
  setup() {
    const eeStore = useEE();
    return { eeStore }; // Make it available to the component
  },
  data() {
    return {
      // Stores the current command being typed
      currentInput: "",

      // Array of lines displayed in the terminal
      outputLines: [
        "╔════════════════════════════════════════╗",
        "║             DOS-Dae v1.4.2             ║",
        "║                                        ║",
        "║               Sixstrings Software Ltd. ║",
        "║            1992 - Tous droits réservés ║",
        "╚════════════════════════════════════════╝",
        "",
        "Tapez HELP pour voir les commandes disponibles.",
      ],

      // Keeps track of current location in the file system
      currentPath: "C:\\",
      isConnected: false,

      // Virtual file system structure
      // Each node can be either a directory (type: 'dir') or file (type: 'file')
      fileSystem: {
        "C:": {
          // Removed backslash - we'll handle it in path resolution
          type: "dir",
          contents: {
            "LISEZ-MOI.TXT": {
              type: "file",
              content:
                "===============================================\n" +
                "     Sixstrings Software Ltd. - DOS-Dae        \n" +
                "            Version 1.4.2                      \n" +
                "===============================================\n" +
                "\n" +
                "Sixstrings Software Ltd. vous remercie d'avoir mis à jour\n" +
                "DOS-Dae à la version 1.4.2!\n" +
                "\n" +
                "Cette mise à jour contient de nombreuses améliorations\n" +
                "dont voici un résumé:\n" +
                "\n" +
                "  - Supporte désormais jusqu'à 4MB de mémoire RAM\n" +
                "  - Performances optimales pour les processeurs i386 32 bits\n" +
                "  - Autocomplétion des commandes du terminal avec la touche TAB\n" +
                "  - Les disques et disquettes sont accessibles comme des dossiers\n" +
                "\n" +
                "De nombreuses autres nouveautés vous attendent et sont\n" +
                "dores et déjà détaillées dans la nouvelle édition de\n" +
                "notre magazine hebdomadaire DOSMag.\n" +
                "\n" +
                "Nous vous remercions pour votre fidélité.\n" +
                "===============================================\n",
            },
            "CONFIG.SYS": {
              type: "file",
              content: "DEVICE=HIMEM.SYS\nDEVICE=EMM386.EXE",
            },
            "MAIMOT.TXT": {
              type: "file",
              content:
                "Gore m'at envoyer 1 mesage por l'ordinateure. Il a dis s'ait inporten.\nPapa il a mi 1 truc pr lé diskett. Je croit s'ait D:\\ mé jsé pa komen on y vat. Men foux, jpouré jouait a Doum!",
            },
            DOCUMENTS: {
              type: "dir",
              contents: {
                "CODE-DE-TRICHER.TXT": {
                  type: "file",
                  content:
                    "Caseulvania sur la supère nintendos:\nForait: possion a2 a4",
                },
              },
            },
            MESSAGES: {
              type: "dir",
              contents: {
                "15.04.1992-17:41_gore@retromail.ch.MSG": {
                  type: "file",
                  content:
                    "Salut! Smity m'a dit un truc trop cool à la récré. Tu peux utiliser la commande CD suivie d'un espace et de deux points (CD ..) pour remonter d'un dossier dans le terminal de l'ordinateur! A demain, oublie pas les anti-sèches pour le contrôle de maths!",
                },
                "28.03.1992-18:05_gouze@retromail.ch.MSG": {
                  type: "file",
                  content:
                    "Fait chier, j'ai encore foiré mon épreuve d'histoire. T'as eu combien toi? Y'en a marre d'apprendre par coeur la carte de la Yougoslavie!",
                },
                "17.03.1992-11:30_raugdae@retromail.ch.MSG": {
                  type: "file",
                  content:
                    "Hé dis, t'as essayé le nouveau Zelda? Il est trop stylé! Y'a un monde sombre sous le monde normal! Si tu l'as pas je te le prête quand je l'aurai finit!",
                },
                "14.03.1992-18:56_racine@retromail.ch.MSG": {
                  type: "file",
                  content:
                    "T'avais pas besoin de t'énerver parceque je passais pas mon tour! Faut bien que quelqu'un lise les règles, non? Bon c'est pas grave. En tout cas, c'est trop chouette ouarameure!",
                },
                "09.03.1992-09:17_smity@retromail.ch.MSG": {
                  type: "file",
                  content:
                    "Tu peux dire à la maîtresse que je peux pas venir à l'école aujourd'hui? J'me suis planté mon pinceau dans l'oeil je dois aller aux urgences avec maman.",
                },
              },
            },
            TELECHARGEMENTS: {
              type: "dir",
              contents: {
                Maité_intégrale: {
                  type: "dir",
                  contents: {
                    "ortollans.MP4": {
                      type: "file",
                      content: "Type de fichier non pris en charge.",
                    },
                    "anguille.MP4": {
                      type: "file",
                      content: "Type de fichier non pris en charge.",
                    },
                    "sanglier.MP4": {
                      type: "file",
                      content: "Type de fichier non pris en charge.",
                    },
                    "cassoulet.MP4": {
                      type: "file",
                      content: "Type de fichier non pris en charge.",
                    },
                    "baudroie.MP4": {
                      type: "file",
                      content: "Type de fichier non pris en charge.",
                    },
                  },
                },
                "Alien_3.MP4": {
                  type: "file",
                  content: "Type de fichier non pris en charge.",
                },
                "Cest_arrivé_près_de_chez_vous.MP4": {
                  type: "file",
                  content: "Type de fichier non pris en charge.",
                },
                "Teentacles.MP4": {
                  type: "file",
                  content: "Type de fichier non pris en charge.",
                },
              },
            },
            LOGS: {
              type: "dir",
              contents: {
                "CONFIG.SYS": {
                  type: "file",
                  content: "DEVICE=HIMEM.SYS\nDEVICE=EMM386.EXE",
                },
              },
            },
          },
        },
        "D:": {
          type: "dir",
          contents: {
            DATA: {
              type: "dir",
              contents: {
                "CONNECT.TXT": {
                  type: "file",
                  content:
                    "69. nains, 69. elfes, 69. humains, 69. orcs\nUne sacrée troupe d'enfoirés...\nconnect nains.elfes.humains.orcs",
                },
              },
            },
            DOOM: {
              type: "dir",
              contents: {
                "DOOM.EXE": {
                  type: "file",
                  content:
                    "Votre système n'est pas assez performant pour exécuter ce programme.",
                },
              },
            },
          },
        },
      },
      remoteSystem: {
        "REMOTE:": {
          type: "dir",
          contents: {
            "ACCESS.LOG": {
              type: "file",
              dynamic: true,
              content: "Accès non autorisé depuis 103.58.232.90",
            },
            PRIVE: {
              type: "dir",
              contents: {
                "LISTEDESCOURSES.TXT": {
                  type: "file",
                  content:
                    "Beurre\nEpinards\nNutella\nHuile de moteur\nSondouiche pouli\nCalendrier des pompiers",
                },
                "RAUGEMU.TXT": {
                  type: "file",
                  content:
                    "## Fichier DECRYPTé le 1 jan. 2025 ##\n" +
                    "## DECRYPTage incomplet            ##\n" +
                    "## Note de l'utilisateur:\n" +
                    "## La dernière ligne du fichier est inDECRYPTable,\n" +
                    "## méthode d'encrypt sûrement trop vieille...\n" +
                    "\n" +
                    "V3nez déc0uvrir notre boutique dès aujourd'hui!\n" +
                    "Large sélection de c0nsoles révolutionn4ires et de jeux-vidéo inoubliabl3s\n" +
                    "Salle d'arc4d3 disponibl3 à l'arrière.\n" +
                    "Nintendo Gameboy en plusi3urs col0ris.\n" +
                    "URVWLEDFRQ",
                },
              },
            },
          },
        },
      },
      // Store previous commands for up/down arrow navigation
      commandHistory: [],
      historyIndex: -1,

      // Used for tab completion
      partialCommand: "",

      // Command definitions
      // Each command has:
      // - execute: Function that runs when command is called
      // - complete: Function that provides tab completion suggestions
      // - help: String describing what the command does
      commands: {
        HELP: {
          execute: () => this.showHelp(),
          complete: (partial) => ["HELP"],
          help: "Afficher les informations d'aide",
        },
        CD: {
          execute: (args) => this.changeDirectory(args[0]),
          complete: (partial) => this.completeDirectory(partial),
          help: "Changer de dossier",
        },
        DIR: {
          execute: () => this.listDirectory(),
          complete: (partial) => ["DIR"],
          help: "Afficher le contenu du dossier",
        },
        TYPE: {
          execute: (args) => this.showFileContents(args[0]),
          complete: (partial) => this.completeFilename(partial, "TYPE"),
          help: "Afficher le contenu d'un fichier",
        },
        DEL: {
          execute: (args) => this.deleteFile(args[0]),
          complete: (partial) => this.completeFilename(partial, "DEL"),
          help: "Supprimer un fichier",
        },
        CONNECT: {
          execute: (args) => this.initiateConnection(args[0]),
          complete: (partial) => ["CONNECT"],
          help: "Connexion à un système distant",
        },
        DISCONNECT: {
          execute: () => this.disconnect(),
          complete: (partial) => ["DISCONNECT"],
          help: "Déconnexion d'un système distant",
          hidden: true, // Won't show in HELP until connected
        },
        CLS: {
          execute: () => {
            this.outputLines = [];
          },
          complete: () => ["CLS"],
          help: "Vider la fenêtre",
        },
        DECRYPT: {
          execute: (args) => this.decryptMessage(args[0]),
          complete: (partial) => [], // No auto-complete for this
          help: null, // Hidden command, won't show in HELP
        },
      },
    };
  },

  methods: {
    // Splits input into command and arguments
    // Example: "TYPE README.TXT" -> { command: "TYPE", args: ["README.TXT"] }
    parseCommand(input) {
      const parts = input.trim().split(" ");
      const command = parts[0].toUpperCase();
      const args = parts.slice(1);
      return { command, args };
    },

    // Main command handling function
    handleCommand() {
      const input = this.currentInput;
      // Add command to terminal output
      this.outputLines.push(`${this.currentPath}>${input}`);
      // Add to command history
      this.commandHistory.push(input);
      this.historyIndex = this.commandHistory.length;

      const { command, args } = this.parseCommand(input);

      if (this.commands[command]) {
        try {
          this.commands[command].execute(args);
        } catch (error) {
          this.outputLines.push(`Erreur: ${error.message}`);
        }
      } else {
        this.outputLines.push("Commande non reconnue.");
      }

      this.currentInput = "";

      this.$nextTick(() => {
        const container =
          this.$refs.terminalContent.querySelector(".output-container");
        container.scrollTop = container.scrollHeight;
        this.$refs.commandInput.focus();
      });
    },

    // Tab completion handler
    handleTab(event) {
      if (!this.currentInput) return;

      const { command, args } = this.parseCommand(this.currentInput);
      const cmd = this.commands[command.toUpperCase()];

      if (cmd && cmd.complete) {
        // Fixed condition
        const suggestions = cmd.complete(args[0] || ""); // Store result in variable
        if (suggestions.length === 1) {
          this.currentInput = suggestions[0];
        } else if (suggestions.length > 1) {
          this.outputLines.push("", ...suggestions, "");
        }
      }
    },

    completeDirectory(partial) {
      try {
        const node = this.getNode(this.currentPath);
        if (!node || node.type !== "dir") return [];

        return Object.entries(node.contents)
          .filter(
            ([name, item]) =>
              item.type === "dir" &&
              name.toUpperCase().startsWith(partial.toUpperCase())
          )
          .map(([name]) => `CD ${name}`);
      } catch {
        return [];
      }
    },

    completeFilename(partial, command = "TYPE") {
      // Add command parameter with default
      try {
        const node = this.getNode(this.currentPath);
        if (!node || node.type !== "dir") return [];

        return Object.entries(node.contents)
          .filter(
            ([name, item]) =>
              item.type === "file" &&
              name.toUpperCase().startsWith(partial.toUpperCase())
          )
          .map(([name]) => `${command} ${name}`); // Use the command parameter
      } catch {
        return [];
      }
    },

    // Implement the actual command functions
    showHelp() {
      // Display all available commands and their help text
      this.outputLines.push("Commandes disponibles:");
      Object.entries(this.commands).forEach(([name, cmd]) => {
        this.outputLines.push(`  ${name} - ${cmd.help}`);
      });
    },

    changeDirectory(path) {
      if (!path) {
        // CD without args shows current directory
        this.outputLines.push(this.currentPath);
        return;
      }

      try {
        const newPath = this.resolvePath(path);
        const node = this.getNode(newPath);

        if (node && node.type === "dir") {
          this.currentPath = newPath;
        } else {
          throw new Error("Dossier invalide");
        }
      } catch (error) {
        throw new Error("Chemin invalide");
      }
    },

    listDirectory() {
      // Show contents of current directory
      try {
        const node = this.getNode(this.currentPath);
        if (!node || node.type !== "dir") throw new Error("Pas un dossier.");

        this.outputLines.push(`Dossier ${this.currentPath}`);
        this.outputLines.push("");

        if (this.currentPath !== "C:\\" && this.currentPath !== "D:\\") {
          this.outputLines.push("<DIR>  ..");
        }

        Object.entries(node.contents).forEach(([name, item]) => {
          const isDir = item.type === "dir";
          this.outputLines.push(`${isDir ? "<DIR>" : "     "} ${name}`);
        });
        this.outputLines.push(""); // Add blank line after listing
      } catch (error) {
        throw new Error("Erreur lors de l'accès au dossier");
      }
    },

    showFileContents(filename) {
      if (!filename) {
        throw new Error("Nom de fichier manquant");
      }

      try {
        const dir = this.getNode(this.currentPath);
        const file = dir.contents[filename];

        if (file && file.type === "file") {
          // If it's ACCESS.LOG, prepend the current timestamp
          if (filename === "ACCESS.LOG") {
            this.outputLines.push(
              `Dernière connexion: ${new Date().toLocaleString("fr-FR")}\n${
                file.content
              }`
            );
          } else {
            this.outputLines.push(file.content);
          }
        } else {
          throw new Error("Fichier introuvable");
        }
      } catch (error) {
        throw new Error("Erreur lors de la lecture du fichier");
      }
    },
    deleteFile(filename) {
      if (!filename) {
        throw new Error("Nom du fichier manquant");
      }

      try {
        const dir = this.getNode(this.currentPath);
        const file = dir.contents[filename];

        if (!file) {
          throw new Error("Fichier introuvable");
        }

        if (file.type !== "file") {
          throw new Error("Not a file");
        }

        // Some files could be write-protected
        if (file.protected) {
          throw new Error("Accès refusé");
        }

        // Delete the file
        delete dir.contents[filename];
        this.outputLines.push(`${filename} supprimé`);

        // Secret achievement check
        if (filename === "ACCESS.LOG" && this.currentPath === "REMOTE:\\") {
          this.outputLines.push("Journaux d'authentification supprimés.");
          this.eeStore.unlockAchievement("ghost-in-the-shell");
        }
      } catch (error) {
        throw new Error(
          `Erreur lors de la suppression du fichier: ${error.message}`
        );
      }
    },

    async initiateConnection(address) {
      if (!address) {
        throw new Error("Addresse requise");
      }

      if (this.isConnected) {
        throw new Error(
          "Déjà connecté. Tapez DISCONNECT pour vous déconnecter."
        );
      }

      this.outputLines.push(`Tentative de connection à ${address}...`);

      // Simulate connection sequence
      await this.simulateConnecting();

      if (address === "69.69.69.69") {
        // Your secret IP
        this.outputLines.push("Connection établie!");
        this.currentPath = "REMOTE:\\";
        this.isConnected = true;

        // Show the DISCONNECT command in help now
        this.commands.DISCONNECT.hidden = false;
      } else {
        this.outputLines.push("Echec de la connection: Hôte inatteignable");
      }
    },

    async simulateConnecting() {
      const randomDelay = () =>
        new Promise((resolve) =>
          setTimeout(resolve, Math.floor(300 + Math.random() * 400))
        );

      // Show progress dots on the same line
      let dots = "";
      for (let i = 0; i < 3; i++) {
        dots += ".";
        this.outputLines.push(dots);
        if (i < 2) this.outputLines.pop();
        await randomDelay();

        // Force scroll after each update
        this.$nextTick(() => {
          const container =
            this.$refs.terminalContent.querySelector(".output-container");
          container.scrollTop = container.scrollHeight;
        });
      }

      // Simulate various connection steps
      const steps = [
        "Résolution de l'hôte...",
        "Initialisation du handshake...",
        "Négociation SSL/TLS...",
        "Authentification...",
      ];

      for (const step of steps) {
        await randomDelay();
        this.outputLines.push(step);

        this.$nextTick(() => {
          const container =
            this.$refs.terminalContent.querySelector(".output-container");
          container.scrollTop = container.scrollHeight;
        });
      }
    },

    disconnect() {
      if (!this.isConnected) {
        throw new Error("Vous n'êtes pas connecté à un système distant.");
      }

      this.outputLines.push("Déconnexion du système distant...");
      this.currentPath = "C:\\";
      this.isConnected = false;
      this.commands.DISCONNECT.hidden = true; // Hide DISCONNECT command again
    },

    async decryptMessage(code) {
      if (!code) {
        throw new Error("Missing code to decrypt");
      }

      if (code.toUpperCase() === "URVWLEDFRQ") {
        this.outputLines.push("Decrypting message...");

        await this.simulateDecryption();

        // Define credits content
        const credits = [
          "╔═══════════════════════════════════════════╗",
          "║         FÉLICITATIONS !                   ║",
          "║    Vous avez résolu l'énigme RaugEmu !    ║",
          "╚═══════════════════════════════════════════╝",
          "",
          "## CREDITS ##",
          "",
          "Website Design & Development:",
          "  - Zad",
          "",
          "Backend & Infrastructure",
          "  - Raugdae",
          "",
          "Special Thanks:",
          "  - Racinovski (Testing et cheering)",
          "  - Claude.ai (Entité synthétique sympathique.)",
          "  - EmulatorJS team (Développement EJS)",
          "",
          "Il est temps de retourner en 2025...",
          "",
        ];

        // Display credits line by line with delay
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        for (const line of credits) {
          this.outputLines.push(line);
          await delay(300); // Adjust delay time as needed

          this.$nextTick(() => {
            const container =
              this.$refs.terminalContent.querySelector(".output-container");
            container.scrollTop = container.scrollHeight;
          });
        }

        this.eeStore.unlockAchievement("puzzle-solved");
      } else {
        this.outputLines.push("Decryption failed: Invalid code");
      }
    },

    async simulateDecryption() {
      const randomDelay = () =>
        new Promise((resolve) =>
          setTimeout(resolve, Math.floor(500 + Math.random() * 400))
        );

      const steps = [
        "Analyse...",
        "Chiffrage César détecté, décodage en cours...",
        "Vérification du checksum...",
        "Message décrypté:",
        "##############",
        "# ROSTIBACON #",
        "##############",
      ];

      for (const step of steps) {
        await randomDelay();
        this.outputLines.push(step);

        this.$nextTick(() => {
          const container =
            this.$refs.terminalContent.querySelector(".output-container");
          container.scrollTop = container.scrollHeight;
        });
      }
    },

    // Path resolution and navigation helpers
    resolvePath(path) {
      if (!path) return this.currentPath;

      const isAbsolute = path.includes(":\\");
      const base = isAbsolute ? "" : this.currentPath;
      const parts = [...base.split("\\"), ...path.split("\\")];

      const resolved = parts.reduce((acc, part) => {
        if (part === "..") return acc.slice(0, -1);
        if (part === "" || part === ".") return acc;
        return [...acc, part];
      }, []);

      return resolved.join("\\") + "\\";
    },

    getNode(path) {
      const cleanPath = path.replace(/\\$/, "");
      const parts = cleanPath.split("\\").filter(Boolean);

      // Choose filesystem based on connection state
      const fileSystem =
        parts[0] === "REMOTE:" ? this.remoteSystem : this.fileSystem;

      if (parts.length === 1 && parts[0].endsWith(":")) {
        return fileSystem[parts[0]];
      }

      let currentNode =
        fileSystem[parts[0].endsWith(":") ? parts[0] : parts[0] + ":"];
      parts.slice(parts[0].endsWith(":") ? 1 : 0).forEach((part) => {
        if (!currentNode || currentNode.type !== "dir")
          throw new Error("Chemin invalide");
        currentNode = currentNode.contents[part];
      });

      return currentNode;
    },
  },
  mounted() {
    this.$refs.commandInput.addEventListener(
      "focus",
      () => (this.isFocused = true)
    );
    this.$refs.commandInput.addEventListener(
      "blur",
      () => (this.isFocused = false)
    );
  },
};
</script>
<style scoped>
.terminal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.terminal-window {
  width: 680px;
  height: 500px;
  background: #000;
  border: 2px solid #00ff00;
  color: #00ff00;
  font-family: "Courier New", monospace;
  display: flex;
  flex-direction: column;
}

.terminal-header {
  background: #00ff00;
  color: #000;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  flex: 0 0 auto;
}

.terminal-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.input-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 8px;
  padding: 10px;
  background: #000; /* Match terminal background */
}

.input-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

input {
  background: transparent;
  border: none;
  color: #00ff00;
  font-family: "Courier New", monospace;
  flex-grow: 1;
  outline: none;
  padding: 0;
  caret-color: #00ff00;
}

.close-btn {
  background: none;
  border: none;
  color: #000;
  cursor: pointer;
  font-size: 20px;
  padding: 0 5px;
}

.terminal-content {
  padding: 10px;
  height: calc(100% - 35px); /* Adjust based on your header height */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.output-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  padding-bottom: 40px; /* Space for input line */
}

.output-line {
  white-space: pre-wrap;
  line-height: 1.2;
  min-height: 1.2em;
}

.prompt {
  white-space: nowrap;
}
</style>
