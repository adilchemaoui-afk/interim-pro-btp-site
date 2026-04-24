import { useState, useRef, useEffect } from 'react'
import { 
  Menu, X, Phone, Mail, MapPin, ChevronDown, HardHat, 
  Zap, Paintbrush, Hammer, Truck, Building2, 
  Users, Briefcase, Clock, CheckCircle,
  Star, TrendingUp, GraduationCap, ShieldCheck,
  Calendar, MessageCircle, Linkedin, Facebook,
  Instagram, Send, Bot, Cpu, Sparkles, Upload, FileText,
  Handshake, Award, Leaf, Zap as ZapIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { sendContactEmail, sendCVEmail, initEmailJS } from './services/emailService'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialiser EmailJS au chargement
  useEffect(() => {
    initEmailJS()
  }, [])

  // Scroll handler
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 100)
    }, { passive: true })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  // Envoyer le formulaire de contact
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      await sendContactEmail({
        nom: formData.get('nom') as string || '',
        prenom: formData.get('prenom') as string || '',
        email: formData.get('email') as string || '',
        telephone: formData.get('telephone') as string || '',
        type: formData.get('type') as string || '',
        departement: formData.get('departement') as string || '',
        message: formData.get('message') as string || ''
      })
      toast.success('Message envoyé avec succès ! Nous vous répondrons rapidement.')
      e.currentTarget.reset()
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsSending(false)
    }
  }

  // Envoyer le formulaire CV
  const handleSubmitCV = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      await sendCVEmail({
        nom: formData.get('nom_cv') as string || '',
        email: formData.get('email_cv') as string || '',
        telephone: formData.get('telephone_cv') as string || '',
        cv_filename: cvFile ? cvFile.name : 'Non téléchargé'
      })
      toast.success('CV envoyé avec succès ! Notre équipe vous contactera.')
      setCvFile(null)
      e.currentTarget.reset()
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsSending(false)
    }
  }

  // CV Upload handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf' || file.type.includes('word')) {
      setCvFile(file)
      toast.success(`CV "${file.name}" téléchargé avec succès !`)
    } else {
      toast.error('Veuillez télécharger un fichier PDF ou Word')
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const services = [
    { icon: Building2, title: 'Maçonnerie & Gros Œuvre', desc: 'Maçons, coffreurs, ferrailleurs qualifiés' },
    { icon: HardHat, title: 'Couverture & Étanchéité', desc: 'Couvreurs, zingueurs, étancheurs' },
    { icon: Paintbrush, title: 'Plâtrerie & Finition', desc: 'Plâtriers, peintres, carreleurs' },
    { icon: Zap, title: 'Électricité & Plomberie', desc: 'Électriciens, plombiers, chauffagistes' },
    { icon: Hammer, title: 'Menuiserie & Agencement', desc: 'Menuisiers, poseurs, agenceurs' },
    { icon: Truck, title: 'Conduite d\'Engins', desc: 'Conducteurs de grue, pelleteuses, CACES' },
  ]

  const processSteps = [
    { num: '01', icon: Upload, title: 'Déposez votre CV', desc: 'Téléchargez votre CV dans notre espace sécurisé' },
    { num: '02', icon: Bot, title: 'Analyse IA', desc: 'Notre IA analyse votre profil et vos compétences' },
    { num: '03', icon: Users, title: 'Matching Intelligent', desc: 'Nous vous proposons les meilleures opportunités' },
    { num: '04', icon: Briefcase, title: 'Mise au Travail', desc: 'Démarrage rapide avec suivi personnalisé' },
  ]

  // Only 3 formations as requested
  const formations = [
    { 
      title: 'SST — Sauveteur Secouriste du Travail', 
      desc: 'Formation obligatoire à la prévention des risques professionnels. Apprenez à porter secours en cas d\'accident sur le chantier.',
      duration: '12 heures', 
      price: '1 800 DH',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-green-400'
    },
    { 
      title: 'EPI — Équipements de Protection Individuelle', 
      desc: 'Maîtrisez l\'utilisation et la vérification des équipements de protection : casques, gants, harnais, chaussures...',
      duration: '3 heures', 
      price: '400 DH',
      icon: HardHat,
      color: 'from-cyan-500 to-blue-400'
    },
    { 
      title: 'Habilitation Électrique de Base', 
      desc: 'Formation aux bases de l\'habilitation électrique (B0, H0). Sécurité lors des interventions près des installations électriques.',
      duration: '1 jour', 
      price: '900 DH',
      icon: ZapIcon,
      color: 'from-yellow-500 to-orange-400'
    },
  ]

  // AI Agents
  const aiAgents = [
    { 
      name: 'Nova', 
      role: 'Agent IA Candidats', 
      desc: 'Disponible 24/7 pour répondre à vos questions sur les offres, vos droits et votre carrière.',
      features: ['Réponses instantanées', 'Conseil personnalisé', 'Suivi de candidature'],
      icon: Bot,
      color: 'from-emerald-500 to-cyan-400'
    },
    { 
      name: 'Atlas', 
      role: 'Agent IA Employeurs', 
      desc: 'Votre assistant dédié pour trouver les meilleurs profils et gérer vos recrutements.',
      features: ['Matching intelligent', 'Devis instantané', 'Suivi de missions'],
      icon: Cpu,
      color: 'from-blue-500 to-purple-400'
    },
  ]

  // Partner formations
  const partners = [
    { name: 'Institut de Sécurité Maroc', specialty: 'SST & Prévention', logo: 'ISM' },
    { name: 'Centre EPI Certifié', specialty: 'Équipements de Protection', logo: 'CEPI' },
    { name: 'Habilitation Élec Pro', specialty: 'Habilitations Électriques', logo: 'HEP' },
    { name: 'BTP Formation Plus', specialty: 'Formations réglementaires', logo: 'BTP+' },
  ]

  const team = [
    { name: 'Karim Alami', role: 'Directeur Général', dept: 'Direction', image: '/team-director.jpg' },
    { name: 'Sofia Mansouri', role: 'Responsable Marketing', dept: 'Marketing', image: '/team-marketing.jpg' },
    { name: 'Ahmed Benali', role: 'Chargé de Candidats', dept: 'Candidats', image: '/team-candidats.jpg' },
    { name: 'Youssef Tazi', role: 'Chargé d\'Affaires', dept: 'Employeurs', image: '/team-employeurs.jpg' },
    { name: 'Laila Idrissi', role: 'Responsable Com\'', dept: 'Publicité', image: '/team-pub.jpg' },
  ]

  const testimonials = [
    { name: 'Ahmed Tazi', role: 'Intérimaire Maçon', text: 'L\'espace CV est super pratique ! J\'ai déposé mon dossier et l\'IA m\'a proposé des missions parfaites pour moi.', rating: 5 },
    { name: 'Sofia Mansouri', role: 'RH BatiConstruct', text: 'L\'agent IA Atlas nous fait gagner un temps précieux. Les profils proposés sont toujours pertinents.', rating: 5 },
    { name: 'Youssef Alami', role: 'Intérimaire Électricien', text: 'Les formations SST et habilitation électrique m\'ont permis d\'obtenir plus de missions. Merci !', rating: 5 },
  ]

  const faqs = [
    { q: 'Comment déposer mon CV sur la plateforme ?', a: 'Rendez-vous dans la section Espace CV, glissez-déposez votre fichier PDF ou Word, ou cliquez pour sélectionner votre fichier. Notre IA analysera automatiquement votre profil.' },
    { q: 'Les agents IA peuvent-ils vraiment m\'aider ?', a: 'Oui ! Nos agents IA Nova (pour les candidats) et Atlas (pour les employeurs) sont disponibles 24/7 pour répondre à vos questions et vous accompagner.' },
    { q: 'Quelles formations sont disponibles ?', a: 'Nous proposons 3 formations certifiantes : SST (Sauveteur Secouriste du Travail), EPI (Équipements de Protection Individuelle) et Habilitation Électrique de Base.' },
    { q: 'Comment devenir partenaire formation ?', a: 'Contactez-nous via la section Partenaires ou envoyez un email à partenariats@interimprobtp.ma. Notre équipe étudiera votre dossier sous 48h.' },
    { q: 'Quel est le délai de mise au travail ?', a: 'Grâce à notre technologie IA, nous garantissons une mise au travail dans les 24 à 48h suivant l\'analyse de votre CV.' },
    { q: 'Quelles sont vos zones d\'intervention ?', a: 'Nous intervenons sur tout le territoire marocain, avec une présence renforcée à Casablanca, Rabat, Marrakech et Tanger.' },
  ]

  return (
    <div className="min-h-screen bg-eco-dark text-white">
      <Toaster position="top-center" />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-neon' : 'bg-transparent'}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center">
                <HardHat className="w-6 h-6 text-eco-dark" />
              </div>
              <span className="text-xl font-bold font-['Montserrat']">
                Intérim <span className="gradient-text">Pro</span> BTP
              </span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              {['Accueil', 'Services', 'CV', 'Formations', 'IA', 'Partenaires', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium text-gray-300 transition-colors hover:text-emerald-400 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all group-hover:w-full" />
                </button>
              ))}
            </div>
            
            <div className="hidden lg:block">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-eco-dark font-semibold shadow-neon"
              >
                <Sparkles className="w-4 h-4 mr-2" /> Espace Client
              </Button>
            </div>
            
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-emerald-400" />
              ) : (
                <Menu className="w-6 h-6 text-emerald-400" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden glass border-t border-emerald-500/20">
            <div className="container-custom py-4 flex flex-col gap-4">
              {['Accueil', 'Services', 'CV', 'Formations', 'IA', 'Partenaires', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 text-left py-2 font-medium hover:text-emerald-400 transition-colors"
                >
                  {item}
                </button>
              ))}
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-eco-dark font-semibold w-full">
                <Sparkles className="w-4 h-4 mr-2" /> Espace Client
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 cyber-grid animate-grid opacity-50" />
        
        <div className="absolute inset-0">
          <img 
            src="/hero-bg.jpg" 
            alt="Futuristic eco construction" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-eco-darker/95 via-eco-dark/80 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 mb-6 animate-slide-up">
                <Leaf className="w-3 h-3 mr-1" /> BTP 4.0 - Éco-Responsable
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] leading-tight mb-6">
                L'<span className="gradient-text">Intelligence Artificielle</span> au service du BTP
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
                Intérim Pro BTP révolutionne le recrutement dans le bâtiment avec nos agents IA et notre plateforme éco-responsable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('cv')}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-eco-dark font-semibold px-8 shadow-neon"
                >
                  <Upload className="mr-2 w-4 h-4" /> Déposer mon CV
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection('ia')}
                  className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 px-8"
                >
                  <Bot className="mr-2 w-4 h-4" /> Découvrir nos IA
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:grid grid-cols-2 gap-6">
              {[
                { num: '15+', label: 'Années d\'expertise' },
                { num: '5000+', label: 'Intérimaires placés' },
                { num: '350+', label: 'Entreprises clientes' },
                { num: '98%', label: 'Taux de satisfaction' },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="neon-card rounded-2xl p-6 text-center animate-float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.num}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-emerald-400" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding relative">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 mb-4">
              <Building2 className="w-3 h-3 mr-1" /> Nos Métiers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Expertise BTP Complète</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Des solutions d'intérim sur mesure pour tous les corps de métier du bâtiment
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Card 
                key={i} 
                className="neon-card group border-0"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:from-emerald-500/40 group-hover:to-cyan-500/40 transition-all">
                    <service.icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CV Space Section */}
      <section id="cv" className="section-padding bg-eco-darker/50 relative">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 mb-4">
                <Upload className="w-3 h-3 mr-1" /> Espace CV
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Déposez votre <span className="gradient-text">CV en ligne</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Notre intelligence artificielle analyse votre profil et vous propose les missions les plus adaptées à vos compétences. 
                Simple, rapide et sécurisé.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Analyse IA de votre profil en temps réel',
                  'Matching intelligent avec les offres',
                  'Suivi de vos candidatures 24/7',
                  'Alertes personnalisées pour les nouvelles missions',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Card className="neon-card border-0">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Upload className="w-5 h-5 text-emerald-400" />
                    Téléchargez votre CV
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`cv-upload-zone rounded-xl p-8 text-center cursor-pointer transition-all ${
                      isDragging ? 'border-emerald-400 bg-emerald-500/20' : ''
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-emerald-400" />
                    </div>
                    {cvFile ? (
                      <div>
                        <p className="text-emerald-400 font-semibold mb-2">{cvFile.name}</p>
                        <p className="text-gray-400 text-sm">Cliquez pour changer de fichier</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-white font-semibold mb-2">Glissez-déposez votre CV ici</p>
                        <p className="text-gray-400 text-sm">ou cliquez pour sélectionner un fichier (PDF, Word)</p>
                      </div>
                    )}
                  </div>
                  
                  <form onSubmit={handleSubmitCV} className="mt-6 space-y-4">
                    <Input 
                      name="nom_cv"
                      placeholder="Nom complet" 
                      className="bg-eco-dark border-emerald-500/30 text-white placeholder:text-gray-500 focus:border-emerald-400"
                      required 
                    />
                    <Input 
                      name="email_cv"
                      placeholder="Email" 
                      type="email"
                      className="bg-eco-dark border-emerald-500/30 text-white placeholder:text-gray-500 focus:border-emerald-400"
                      required 
                    />
                    <Input 
                      name="telephone_cv"
                      placeholder="Téléphone" 
                      type="tel"
                      className="bg-eco-dark border-emerald-500/30 text-white placeholder:text-gray-500 focus:border-emerald-400"
                    />
                    <Button 
                      type="submit" 
                      disabled={isSending}
                      className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-eco-dark font-semibold disabled:opacity-50"
                    >
                      {isSending ? 'Envoi en cours...' : <><Sparkles className="w-4 h-4 mr-2" /> Envoyer mon CV</>}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Processus <span className="gradient-text">Intelligent</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              De la dépose de votre CV à votre mise au travail, l'IA vous accompagne à chaque étape
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-eco-dark mx-auto mb-6 shadow-neon">
                  {step.num}
                </div>
                <step.icon className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations Section - Only 3 as requested */}
      <section id="formations" className="section-padding bg-eco-darker/50 relative">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 mb-4">
              <GraduationCap className="w-3 h-3 mr-1" /> Centre de Formation
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Formations <span className="gradient-text">Certifiantes</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Trois formations essentielles pour votre sécurité et votre employabilité sur les chantiers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {formations.map((formation, i) => (
              <Card 
                key={i} 
                className="neon-card group border-0 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${formation.color}`} />
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${formation.color} bg-opacity-20 flex items-center justify-center mb-6`}>
                    <formation.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{formation.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{formation.desc}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" /> {formation.duration}
                    </div>
                    <span className="text-2xl font-bold gradient-text">{formation.price}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
                    onClick={() => toast.info('Inscription à la formation en cours de traitement')}
                  >
                    S'inscrire
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="ia" className="section-padding relative">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 mb-4">
              <Cpu className="w-3 h-3 mr-1" /> Intelligence Artificielle
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos <span className="gradient-text">Agents IA</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Disponibles 24h/24 et 7j/7 pour répondre à toutes vos questions en temps réel
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {aiAgents.map((agent, i) => (
              <Card 
                key={i} 
                className="ai-agent-card border-0 overflow-hidden"
              >
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start gap-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <agent.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-0 text-xs">
                          <Sparkles className="w-3 h-3 mr-1" /> IA
                        </Badge>
                      </div>
                      <p className="text-cyan-400 font-medium mb-3">{agent.role}</p>
                      <p className="text-gray-400 mb-4">{agent.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.features.map((feature, j) => (
                          <span 
                            key={j} 
                            className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm border border-white/10"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button 
                    className={`w-full mt-6 bg-gradient-to-r ${agent.color} text-white font-semibold`}
                    onClick={() => toast.info(`${agent.name} sera bientôt disponible pour le chat !`)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> Discuter avec {agent.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Card className="neon-card border-0 inline-block max-w-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">Besoin d'aide immédiate ?</p>
                    <p className="text-gray-400 text-sm">Nos agents IA sont là pour vous 24/7</p>
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-eco-dark font-semibold"
                    onClick={() => scrollToSection('contact')}
                  >
                    Contacter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partenaires" className="section-padding bg-eco-darker/50 relative">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 mb-4">
              <Handshake className="w-3 h-3 mr-1" /> Partenaires
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos <span className="gradient-text">Partenaires Formation</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Des centres de formation certifiés et reconnus pour des formations de qualité
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, i) => (
              <Card 
                key={i} 
                className="partner-card border-0 hover:border-emerald-500/50 transition-all cursor-pointer group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4 group-hover:from-emerald-500/40 group-hover:to-cyan-500/40 transition-all">
                    <span className="text-2xl font-bold gradient-text">{partner.logo}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{partner.name}</h3>
                  <p className="text-gray-400 text-sm">{partner.specialty}</p>
                  <div className="mt-4 flex justify-center">
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Card className="neon-card border-0 inline-block">
              <CardContent className="p-6">
                <p className="text-gray-300 mb-4">Vous êtes un centre de formation ? Rejoignez nos partenaires</p>
                <Button 
                  variant="outline" 
                  className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
                  onClick={() => toast.info('Formulaire de partenariat bientôt disponible')}
                >
                  <Handshake className="w-4 h-4 mr-2" /> Devenir partenaire
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '15+', label: 'Années d\'expertise', icon: Calendar },
              { num: '5000+', label: 'Intérimaires placés/an', icon: Users },
              { num: '350+', label: 'Entreprises clientes', icon: Building2 },
              { num: '98%', label: 'Taux de satisfaction', icon: TrendingUp },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.num}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="équipe" className="section-padding bg-eco-darker/50 relative">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre <span className="gradient-text">Équipe</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Des experts dédiés pour vous accompagner, soutenus par notre intelligence artificielle
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((member, i) => (
              <Card key={i} className="neon-card border-0 overflow-hidden group">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-white">{member.name}</h3>
                  <p className="text-emerald-400 text-sm">{member.role}</p>
                  <Badge variant="secondary" className="mt-2 bg-white/10 text-gray-300 text-xs">
                    {member.dept}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ils nous font <span className="gradient-text">confiance</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="neon-card border-0">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                      <span className="text-eco-dark font-bold">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-eco-darker/50 relative">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions <span className="gradient-text">fréquentes</span></h2>
              <p className="text-gray-400 text-lg mb-8">
                Trouvez rapidement les réponses à vos questions
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-emerald-500/20">
                  <AccordionTrigger className="text-left text-white hover:text-emerald-400">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10" />
        
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Prêt à rejoindre le <span className="gradient-text">BTP 4.0</span> ?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Déposez votre CV maintenant et laissez notre intelligence artificielle trouver la mission parfaite pour vous
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('cv')}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-eco-dark font-semibold px-8 shadow-neon"
            >
              <Upload className="mr-2 w-4 h-4" /> Déposer mon CV
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => scrollToSection('contact')}
              className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 px-8"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding relative">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Contactez-<span className="gradient-text">nous</span></h2>
              <p className="text-gray-400 text-lg mb-8">
                Notre équipe et nos agents IA sont à votre disposition 24/7
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: 'Adresse', value: '123 Boulevard Mohammed VI, Casablanca' },
                  { icon: Phone, label: 'Téléphone', value: '+212 5 22 12 34 56' },
                  { icon: Mail, label: 'Email', value: 'contact@interimprobtp.ma' },
                  { icon: Clock, label: 'Horaires', value: 'Lun-Ven, 8h-18h | IA 24/7' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{item.label}</p>
                      <p className="text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="neon-card border-0">
              <CardHeader>
                <CardTitle className="text-white">Envoyez-nous un message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input 
                      name="nom"
                      placeholder="Nom" 
                      className="bg-eco-dark border-emerald-500/30 text-white placeholder:text-gray-500"
                      required 
                    />
                    <Input 
                      name="prenom"
                      placeholder="Prénom" 
                      className="bg-eco-dark border-emerald-500/30 text-white placeholder:text-gray-500"
                      required 
                    />
                  </div>
                  <Input 
                    name="email"
                    placeholder="Email" 
                    type="email" 
                    className="bg-eco-dark border-emerald-500/30 text-white placeholder:text-gray-500"
                    required 
                  />
                  <Input 
                    name="telephone"
                    placeholder="Téléphone" 
                    type="tel" 
                    className="bg-eco-dark border-emerald-500/30 text-white placeholder:text-gray-500"
                  />
                  <select name="type" className="w-full px-3 py-2 rounded-md bg-eco-dark border border-emerald-500/30 text-white">
                    <option value="">Vous êtes...</option>
                    <option value="candidat">Candidat</option>
                    <option value="employeur">Employeur</option>
                    <option value="partenaire">Partenaire Formation</option>
                  </select>
                  <select name="departement" className="w-full px-3 py-2 rounded-md bg-eco-dark border border-emerald-500/30 text-white">
                    <option value="">Département...</option>
                    <option value="candidats">Candidats</option>
                    <option value="employeurs">Employeurs</option>
                    <option value="formations">Formations</option>
                    <option value="marketing">Marketing</option>
                  </select>
                  <Textarea 
                    name="message"
                    placeholder="Votre message" 
                    rows={4} 
                    className="bg-eco-dark border-emerald-500/30 text-white placeholder:text-gray-500"
                    required 
                  />
                  <Button 
                    type="submit" 
                    disabled={isSending}
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-eco-dark font-semibold disabled:opacity-50"
                  >
                    {isSending ? 'Envoi en cours...' : <><Send className="w-4 h-4 mr-2" /> Envoyer</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-eco-darker border-t border-emerald-500/20 py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center">
                  <HardHat className="w-6 h-6 text-eco-dark" />
                </div>
                <span className="text-xl font-bold font-['Montserrat']">
                  Intérim <span className="gradient-text">Pro</span> BTP
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                L'intelligence artificielle au service du BTP marocain. Éco-responsable et innovant.
              </p>
              <div className="flex gap-4">
                {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center hover:bg-emerald-500/30 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Liens rapides</h4>
              <ul className="space-y-3">
                {['Accueil', 'Services', 'CV', 'Formations', 'IA', 'Partenaires', 'Contact'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Nos formations</h4>
              <ul className="space-y-3">
                {['SST', 'EPI', 'Habilitation Électrique'].map((item) => (
                  <li key={item}>
                    <span className="text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-4">Restez informé de nos dernières offres</p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input 
                  placeholder="Votre email" 
                  type="email" 
                  className="bg-eco-dark border-emerald-500/30 text-white placeholder:text-gray-500"
                />
                <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-eco-dark px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-emerald-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 Intérim Pro BTP. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              {['Mentions légales', 'Politique de confidentialité', 'CGU'].map((item) => (
                <a key={item} href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
