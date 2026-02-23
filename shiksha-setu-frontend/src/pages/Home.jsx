import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, BookOpen, Users, TrendingUp, Star, Play, 
  Award, Clock, Globe, Shield, ChevronRight, 
  Sparkles, Target, Rocket, Heart
} from 'lucide-react';
import { Button, Card, Badge, ProgressBar } from '@components/ui';

export const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Diverse Courses',
      description: 'Explore thousands of courses across various categories and skill levels',
      color: 'from-blue-500 to-cyan-500',
      stats: '500+ Courses',
    },
    {
      icon: Users,
      title: 'Expert Mentors',
      description: 'Learn from industry experts and experienced professionals worldwide',
      color: 'from-purple-500 to-pink-500',
      stats: '200+ Mentors',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Advance your career with in-demand skills and industry certifications',
      color: 'from-green-500 to-emerald-500',
      stats: '95% Success Rate',
    },
    {
      icon: Zap,
      title: 'Learn Fast',
      description: 'Interactive lessons, hands-on projects, and personalized learning paths',
      color: 'from-orange-500 to-red-500',
      stats: 'Self-Paced',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      image: '👩‍💻',
      rating: 5,
      text: 'Shiksha Setu transformed my career! The courses are practical and the mentors are incredibly supportive.',
    },
    {
      name: 'Raj Patel',
      role: 'Data Scientist',
      image: '👨‍🔬',
      rating: 5,
      text: 'The quality of content and the interactive learning approach made complex topics easy to understand.',
    },
    {
      name: 'Emily Chen',
      role: 'UX Designer',
      image: '👩‍🎨',
      rating: 5,
      text: 'Amazing platform! I landed my dream job after completing the UX design course. Highly recommended!',
    },
  ];

  const stats = [
    { label: 'Active Courses', value: '500+', icon: BookOpen },
    { label: 'Happy Students', value: '50K+', icon: Users },
    { label: 'Expert Mentors', value: '200+', icon: Award },
    { label: 'Success Rate', value: '95%', icon: Target },
  ];

  const benefits = [
    { icon: Clock, title: 'Flexible Learning', desc: 'Learn at your own pace, anytime, anywhere' },
    { icon: Award, title: 'Certificates', desc: 'Earn industry-recognized certificates' },
    { icon: Globe, title: 'Global Community', desc: 'Connect with learners worldwide' },
    { icon: Shield, title: 'Lifetime Access', desc: 'Access your courses forever' },
  ];

  return (
    <div className="bg-pattern min-h-screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-32"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full text-primary-700 font-medium"
              >
                <Sparkles className="w-4 h-4" />
                <span>Welcome to the Future of Learning</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-responsive-xl font-bold leading-tight text-gray-900"
              >
                Transform Your Future with{' '}
                <span className="gradient-text-alt">Expert-Led</span>{' '}
                Online Courses
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
              >
                Join thousands of learners advancing their careers with our comprehensive, 
                industry-relevant courses taught by world-class mentors.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/register">
                  <Button variant="primary" size="lg" icon={Rocket}>
                    Start Learning Today
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button variant="outline" size="lg" icon={Play}>
                    Explore Courses
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 pt-4"
              >
                <div className="flex -space-x-2">
                  {['👨‍💻', '👩‍🎨', '👨‍🔬', '👩‍💼'].map((emoji, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white border-2 border-white">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Join 50,000+ learners</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">4.9/5 rating</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="relative h-96 lg:h-[500px]">
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl"
                >
                  📚
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute top-32 left-10 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center text-white text-xl shadow-lg"
                >
                  🎯
                </motion.div>

                <motion.div
                  animate={{ y: [0, -25, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                  className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-400 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl"
                >
                  🚀
                </motion.div>

                {/* Main hero graphic */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-3xl opacity-10 blur-3xl" />
                <div className="relative h-full bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-3xl flex items-center justify-center text-white text-8xl shadow-2xl animate-glow">
                  🎓
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section variants={itemVariants} className="py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="text-center group"
              >
                <Card variant="elevated" className="p-8 hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="text-white w-8 h-8" />
                  </div>
                  <p className="text-4xl font-bold gradient-text mb-2">{stat.value}</p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section variants={itemVariants} className="py-16">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-responsive-lg font-bold mb-4 gradient-text"
            >
              Why Choose Shiksha Setu?
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of expert instruction, cutting-edge technology, 
              and personalized learning paths designed for your success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card variant="elevated" className="text-center h-full hover:shadow-2xl transition-all duration-500">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="text-white w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                  <Badge variant="glass" className="text-xs">{feature.stats}</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section variants={itemVariants} className="py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2 
                className="text-responsive-lg font-bold mb-6 gradient-text-warm"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Everything You Need to Succeed
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Our comprehensive learning platform provides all the tools, resources, 
                and support you need to achieve your goals.
              </motion.p>
              
              <div className="space-y-6">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card variant="gradient" className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Your Learning Progress</h3>
                    <Badge variant="success">On Track</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>React Development</span>
                        <span>85%</span>
                      </div>
                      <ProgressBar progress={85} showLabel={false} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>UI/UX Design</span>
                        <span>72%</span>
                      </div>
                      <ProgressBar progress={72} showLabel={false} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Data Science</span>
                        <span>94%</span>
                      </div>
                      <ProgressBar progress={94} showLabel={false} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Overall Progress</span>
                      <span className="font-bold text-primary-600">84%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section variants={itemVariants} className="py-16">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-responsive-lg font-bold mb-4 gradient-text-alt"
            >
              What Our Students Say
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful learners who have transformed their careers with Shiksha Setu.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card variant="elevated" className="h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 italic leading-relaxed">"{testimonial.text}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section variants={itemVariants} className="py-20">
          <Card variant="gradient" className="text-center p-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-5" />
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full opacity-10 animate-float" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-secondary-400 to-accent-400 rounded-full opacity-10 animate-float float-delayed" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full text-primary-700 font-medium mb-6"
              >
                <Heart className="w-4 h-4" />
                <span>Join Our Learning Community</span>
              </motion.div>

              <motion.h2 
                className="text-responsive-lg font-bold mb-6 gradient-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Ready to Transform Your Future?
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Join thousands of students and mentors already learning on Shiksha Setu. 
                Start your journey today with our expert-led courses and personalized learning experience.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/register">
                  <Button variant="primary" size="xl" icon={Rocket}>
                    Start Learning Free
                  </Button>
                </Link>
                <Link to="/mentor-register">
                  <Button variant="secondary" size="xl" icon={Users}>
                    Become a Mentor
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button variant="outline" size="xl" icon={ChevronRight}>
                    Browse Courses
                  </Button>
                </Link>
              </motion.div>

              <motion.p 
                className="text-sm text-gray-500 mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                No credit card required • 7-day free trial • Cancel anytime
              </motion.p>
            </div>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  );
};
