const admin = require("firebase-admin");
const initializeFirebase = () => {
    admin.initializeApp({
        credential: admin.credential.cert({
            type: "service_account",
            project_id: "loan-agents",
            private_key_id: "2685e4db8906d0f44d760032882ff1bc772a65da",
            private_key:
                "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC2UlScVv+V5cQr\ni1Ql/sRYby1IR0kTajcuTsEym7zE3z1mMxw9wmVsslsfI9DdhRRGpN6mxspxAS2g\nL/r1p6vOHCfm8wTTdCA0qMXX965Im3QZW+GsSul+o4dfZ8lwuHKEwmgLKe1D9hdT\neqvmoe8Z7LQvHWzZJTcdzMYhNk1LFDxncS4PCI1d6Pi7v6n40NTMa81YiZTNl4QZ\nTdAgstKRfdOra6rIA7KhVBz6YW792wBkn8Pw21QiFAFeOSwA/ddcRoAq9BTwYmmk\nXjdR/+11qKbc5aIjv87Khn6N5EbOTl3DZ5jlo0jyyHkQz5a3GqSSUZMvaK3tNSpU\nElp7ig5lAgMBAAECggEAB0AgbcQ271DfG4UzsDwgtkybjiWJlixR6/VFURwo5mJj\nWHJdY+ZcbrVsEsGzn2+YphON6C99Iv/TPuzRi93iYvSzMIfHEBqs4jM5BPTsWSZX\neF+zSo0DGp5ptoVT2Tf4k+eASDtfXGXHuTHmbqpPbiY/5yTCLKOCfNylH3J/oeXn\nelj+0sqiIGXBHqplkCULRg4/NQNl8snIkwRJAPdJjttzvR++SswTU3LnFKybeTH0\nRuweUajF5YEWbIbFrMC/qR30s4fYaxZS9jf2D3f8SAGOlGljGekKrqjmhjF+uuHE\nzAS/DHHwt6kUmSSQUxXT8wXKVoQwMYvjGlquglftUQKBgQD8NLD3mvU2jniPQA1j\ngGZ0pDWI8lVtFwzgRk2ywxOD8XIxgIlUy0bUOnk2wBbfHViyqNS3tyQ4D6rYDL+a\nSHVu/9TgaUy7TDZf5W6uFDzNGFy7l7pPBWxcNxnMhAWENSWmFfJ6Up8RbX5M9au3\n5KkhGxzDtP2+yR0Rsktt/nILlQKBgQC5EH9RaaSyOwg+Brub2Uei6n/1pWB7rW7U\nwpYHfGMqj+97giJ19KWs6xfYZRlcc2mHbbbWtuUAAFbATdiIjxCOfFsM0AO8dnLn\nJEmOjWTaxcZyYeD9x8zFe58RKSDl34/vUZA5GdT6orQbiHlBjGsTjW5JORhhLqU7\nQdtFFePDkQKBgBtsR0nFCaCzARziZBJLpdhM+p03bF5+QSIpws0LNRYFrNsBFO2p\nZLwy13dCj7oW4MwcW3TWbxPBcFwplrPZ6Rr2qlj0WimLceYfdldrT+klGwAy0UlC\nV7P3MdDxEgB8HunePQ1b6nvkofUQSWmnbVRyNEB7b5PNHmIMNvNw1Um5AoGALHd1\nUBeFNjoO8fBmNb1QhCm6U0jIVQ9IGSEkMWpG3Zw2G8QaCaOeB115nko0fM1SZvMK\nwq6xeX2bWpuZ0r4laUciDYMR0r/XPgivD+yTdimdVDCGghP29OCOSO5L9E/yYruD\nXuUBErPzeMYi9IgL1mfePwPUAs3Vb9aUHBZ1YrECgYBRWhzfxPw1mHAfhAN5U2bR\n6PmnRuFaL1LZ/a7EyWPO8PXmTpt6mJr35xXCog+gBBgCUYwJCuRLRtx3gVmvwB6F\nYPffwUQ/EkFkX3wIzJwW1mdoKzE04DyKREiJ41t9AiBQGTcsMbZEX/VwE/kNpKO6\nqUA6m+KoOK6QxAvIuZeBYg==\n-----END PRIVATE KEY-----\n",
            client_email:
                "firebase-adminsdk-2lcb2@loan-agents.iam.gserviceaccount.com",
            client_id: "113642601407413305935",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url:
                "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2lcb2%40loan-agents.iam.gserviceaccount.com",
            storageBucket: "gs://loan-agents.appspot.com"
        }),
    });
};

module.exports = initializeFirebase;
