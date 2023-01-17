import React, { useState, useEffect } from 'react';
import ProductImage from '../assets/product.png';
import {
  motion,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
//svgs
import { ReactComponent as Close } from '../assets/close.svg';
import { ReactComponent as Chevron } from '../assets/chevron.svg';
import { ReactComponent as DownArrow } from '../assets/down-arrow.svg';

const Product = () => {
  const ease = [0.6, 0.05, -0.01, 0.99];
  const x = useSpring(0, { stiffness: 300, damping: 200, ease: ease });
  const width = useTransform(x, [-1060, 0], [350, 0]);
  const scale = useTransform(x, [-100, 0], [1.25, 1]);
  const fadeIn = useTransform(x, [-100, 0], [1, 0]);
  const fadeOut = useTransform(x, [-60, 0], [0, 1]);
  const up = useTransform(x, [-100, 0], [-100, 0]);
  const down = useTransform(x, [-100, 0], [100, 0]);

  let targetElement = document.querySelector('html');

  //state
  const [state, setState] = useState(false);
  useEffect(() => {
    //change the state dependent if my x has passed -100px on the x-axis
    x.onChange(() => {
      x.get() > -100 ? setState(false) : setState(true);
    });
  }, [x]);
  const closeProductDrag = () => {
    x.stop();
    x.set(0);
  };
  useEffect(() => {
    state
      ? targetElement.classList.add('no-scroll')
      : targetElement.classList.remove('no-scroll');
  }, [state, targetElement.classList]);
  return (
    <div className='product'>
      <div className='product-inner'>
        <div className='product-content'>
          <motion.div
            className='product-content-inner'
            style={{ translateY: up }}
          >
            <h4>Freedom Everywhere</h4>
            <h1>HiFive1 Rev B</h1>
            <p>
              HiFive1 is a low-cost, Arduino-compatible development board
              featuring the Freedom E310. It’s the best way to start prototyping
              and developing your RISC‑V applications.
            </p>
            <div className='btn-row'>
              <button>Buy Now ($59)</button>
              <DownArrow />
            </div>
          </motion.div>
        </div>
      </div>
      <div className='product-slide-enlarge'>
        <motion.div
          className='background'
          style={{ opacity: fadeIn }}
        ></motion.div>
        {state ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ ease: ease }}
              className='product-drag-header'
            >
              <div className='company-name'>HiFive1</div>
              <div className='close' onClick={closeProductDrag}>
                <Close />
              </div>
            </motion.div>
          </AnimatePresence>
        ) : null}

        <div className='product-container'>
          <motion.div
            className='product-image'
            style={{ x, scale }}
            drag={'x'}
            dragConstraints={{ left: -1060, right: 0 }}
            dragElastic={0.05}
          >
            <img src={ProductImage} alt='product' />
          </motion.div>
        </div>
        <motion.div className='product-drag' style={{ paddingBottom: down }}>
          <div className='product-drag-inner'>
            <div className='product-drag-label'>
              <motion.h6 style={{ opacity: fadeOut, x }}>
                <Chevron />
                Drag To Enlarge
              </motion.h6>
            </div>
            <div className='product-drag-progress-background'>
              <motion.div
                className='product-drag-progress'
                style={{ width }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Product;
