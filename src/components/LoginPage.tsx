import { useState } from "react";
import { Lock, Key, AlertCircle, CheckCircle, Hash, Shield, Eye, EyeOff, BookOpen, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { verifyCode, hashCode } from "@/lib/auth";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const [showHashDemo, setShowHashDemo] = useState(false);

  // Funzione per mostrare l'hash in tempo reale (scopo didattico)
  const updateHashPreview = async (value: string) => {
    if (value.length > 0) {
      const hash = await hashCode(value);
      setCurrentHash(hash);
    } else {
      setCurrentHash("");
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode(value);
    setError("");
    if (showHashDemo) {
      updateHashPreview(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simuliamo un breve ritardo per mostrare il loading
    await new Promise(resolve => setTimeout(resolve, 500));

    const isValid = await verifyCode(code);
    
    if (isValid) {
      onLoginSuccess();
    } else {
      setError("Codice di accesso non valido. Riprova.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            Landing <span className="gradient-text">Builder</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Inserisci il codice di accesso per continuare
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              Autenticazione con Codice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showCode ? "text" : "password"}
                  placeholder="Inserisci il codice di accesso..."
                  value={code}
                  onChange={handleCodeChange}
                  className="pr-12 font-mono"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowCode(!showCode)}
                >
                  {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || !code}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifica in corso...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Accedi
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Educational Section - Hash Demo */}
        <Card className="border-2 border-dashed border-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5 text-secondary" />
              🎓 Sezione Didattica: Come Funziona l'Hashing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Spiegazione */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold">Cos'è un Hash?</h4>
                    <p className="text-sm text-muted-foreground">
                      Un hash è una "impronta digitale" unica di un dato. 
                      Trasforma qualsiasi testo in una stringa di lunghezza fissa.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Hash className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold">Perché SHA-256?</h4>
                    <p className="text-sm text-muted-foreground">
                      SHA-256 produce sempre 64 caratteri esadecimali (256 bit). 
                      È impossibile risalire al valore originale dall'hash.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Lock className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold">Sicurezza</h4>
                    <p className="text-sm text-muted-foreground">
                      Il codice originale non è mai memorizzato! Salviamo solo l'hash 
                      e confrontiamo gli hash per verificare l'accesso.
                    </p>
                  </div>
                </div>
              </div>

              {/* Demo Interattiva */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowHashDemo(!showHashDemo);
                    if (!showHashDemo && code) {
                      updateHashPreview(code);
                    }
                  }}
                  className="w-full"
                >
                  <Code className="w-4 h-4 mr-2" />
                  {showHashDemo ? "Nascondi" : "Mostra"} Hash in Tempo Reale
                </Button>

                {showHashDemo && (
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Hash SHA-256 del tuo input:
                    </div>
                    <div className="code-block text-xs break-all min-h-[60px] flex items-center">
                      {currentHash || "Digita qualcosa per vedere l'hash..."}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      👆 Nota come cambia completamente anche modificando un solo carattere!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Codice di esempio */}
            <div className="code-block text-xs overflow-x-auto">
              <pre>{`// Come funziona la verifica del codice:

async function verifyCode(inputCode) {
  // 1. Calcoliamo l'hash del codice inserito
  const inputHash = await hashCode(inputCode);
  
  // 2. Lo confrontiamo con l'hash salvato
  // L'hash corretto è pre-calcolato e salvato nel codice
  const VALID_HASH = "f0e4c2f76c58916ec...";
  
  // 3. Se gli hash coincidono, il codice è corretto!
  return inputHash === VALID_HASH;
}

// ⚠️ Il codice originale NON è mai memorizzato!
// Solo l'hash è presente nel codice sorgente.`}</pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
