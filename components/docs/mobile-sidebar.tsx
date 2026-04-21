"use client";
import { motion, AnimatePresence } from 'framer-motion';
import DocsSidebar from './sidebar'; 

interface MobileSidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const MobileSidebar = ({ isOpen, setIsOpen }: MobileSidebarProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm lg:hidden"
                    />

                    {/* Sliding Panel */}
                    <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 z-70 w-70 h-full bg-[#0a0a0a] border-r border-white/10 lg:hidden"
                    >
                        <div className="pt-20"> {/* Offset for the Navbar area */}
                            {/* We wrap your existing sidebar but remove its 'hidden' and 'sticky' classes */}
                            <div onClick={() => setIsOpen(false)}>
                                <DocsSidebar isMobile /> 
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileSidebar;