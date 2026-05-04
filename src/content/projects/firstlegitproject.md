---
title: First legit project
description: yes
date: 2025-12-01
tag: Engineering
duration: 20min
---

<div style="text-align:center;">
Final Picture
</div>

I think I delayed this project for at least two years until I finally found 'time' and mental capacity to do this. This project took so long to actually initialise due to the relatively high learning curve. I had to learn how to design my own PCB (Printed Circuit Board), program with new languages, and so much electrical work which was absolutely cancerous.

_Note: This documentation is structured chronologically, reflecting the order in which the work was carried out rather than being divided into sections._

<h2>Phase 1: Design & Planning</h2>

<span style = "margin:20px;"> _"Every journey begins with a single step."_ — Lao Tzu</span>

Alright to begin I thought of building a small drone because it would be cheaper and cool (since anything that flies is cool). That meant I had to find electronics that are small enough and fabricate a PCB to fit all the components nicely which turned out to be a pain in the ass.

In its simplest form, a drone requires

- <b> MCU — Microcontroller Unit</b> (the brain)
- <b> IMU — Inertial Measurement Unit</b> (measure an object's motion in space)
- <b> Motors</b>
- <b> Propellers</b>

To be honest I just went with the smallest electronics that were accessible, and when I mean accessible I mean free. I managed to get the MCU and IMU from my robotics lab. (see below)

<div class = "sidetoside">
  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/newesp32c3.jpg" alt="ESP32C3" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;"> Seeed Studio XIAO ESP32C3</span>
  </div>

  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/bno085img.jpg" alt="BNO085" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;"> Adafruit 9-DOF Orientation IMU BNO085</span>
  </div>
</div>
&nbsp;<br>&nbsp;<br>

I saved USD\$4.90 and USD\$24.95 for the MCU and IMU respectively (without shipping). The costs for the components for this project can be found [here](#cost-breakdown).

For the motors, it is generally recommended to use brushless motors due to higher efficiency and smoother flight. However, they are more expensive than their brushed counterparts and require dedicated <b> ESCs (Electronic Speed Controllers)</b> for each motor, significantly increasing both cost and circuit complexity.

<div class = "sidetoside">
  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/dronemotor.jpg" alt="motor" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;"> 615 coreless brushed motor</span>
  </div>

  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/droneprop.jpg" alt="propeller" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;"> Gemfan 1219 31mm 0.8mm propeller</span>
  </div>
</div>
&nbsp;<br>&nbsp;<br>

For this project, I opted for 615 coreless brushed motors instead. These compact 6×15mm motors offer several advantages for a lightweight drone prototype: they can be driven directly with simple MOSFET circuits without ESCs, reducing both component count and overall system weight. Coreless motors eliminate the iron core found in traditional brushed motors, resulting in lower inertia, faster response times, and reduced electromagnetic interference. While they sacrifice some efficiency compared to brushless motors, their low cost (\~\$1-2 each vs \$10+ for brushless) make them passable for this project. As for the propellers, I just used the cheapest ones that fit my motor and called it a day.

<h2>Visualization</h2>

With most of the key components settled, I started doing some rough sketches on paper. Personally I highly believe in visualizing the project beforehand, and the simplest way is often just with a paper and pen. (in this case a pencil)

<div class = "sidetoside">
  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/sketch1.jpg" alt="sketch1" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;"> First Draft </span>
  </div>

  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/sketch2.jpg" alt="sketch2" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;"> Second Draft</span>
  </div>
</div>
&nbsp;<br>&nbsp;<br>

As I drew up my first draft, I thought of just placing the MCU and IMU side by side for simplicity. However, this would not only make the drone rather large, but also mess with the IMU data — mainly inaccuracy in linear acceleration and increased data processing complexity. You can find out more about the technical details [here](/nerdstuff/imuposition). Hence, a second draft was produced with the MCU and IMU repositioned in a top-down configuration which solves both aforementioned problems.

I always hated how most drones looked like a box with 4 sticks poking out. I know they look like that because it is the simplest and often the most straightforward design, but I decided that was not important enough so I went with a shuriken-like design instead.

<div class = "sidetoside">
  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/defaultdrone.png" alt="default drone" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;"> Literally the 1st picture when you search drone</span>
  </div>

  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/shuriken.jpg" alt="shuriken" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;"> A shuriken (手裏剣, lit. "hand-hidden blade")</span>
  </div>
</div>
&nbsp;<br>&nbsp;<br>

<h2>Modelling — pt.1</h2>

With that, I went onto fusion 360 and began with some rough modelling of the drone.

<div class = "sidetoside">
  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/dronefirstver.png" alt="dronerender" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;">Perspective View</span>
  </div>

  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/dronerendertop.png" alt="toprender" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;">Top View</span>
  </div>
</div>
&nbsp;<br>&nbsp;<br>

Dimensions: 70mm x 63mm x 25mm. I estimated the amount of space I needed for the electronics thought of using a press fit for the motor assembly. Honestly the first modelling phase went pretty smooth as I already had experience with using CAD (Computer-Aided Design) for a decent amount of time. Unfortunately, the same cannot be said for the next phase.

<h2>Circuits</h2>

To provide some context, prior to this project, I have not done anything that heavily required electrical engineering skills, meaning that I would just have to figure things out as they go. I had my qualms about doing this project largely due to the steep learning curve associated with electrical engineering that I hear from my friends. But as usual, I just said "f\*\*\* it we ball" and went for it.

<span style = "margin:20px;"> _"F\*\*\* it we ball."_ — Yue Jiakai </span>

With the first drone model completed, I began with designing the schematic for the PCB. First off, I needed to figure out what my PCB would need to accomplish:

- Communication between MCU and IMU
- Control speed of motors
- Power components

<h3>Communication</h3>

I utilised <b>I2C </b>(Inter-Integrated Circuit) for the serial communication between the MCU and IMU as it is simple to implement and good for short distances on a circuit board. I2C utilises two rails : <b> SDA </b> (Serial Data) - carries the actual data back and forth; <b> SCL </b> (Serial Clock) - provides timing so everyone knows when to listen or talk. Simply put, the SDA and SCL pins must be connected between the MCU and the IMU.

<h3>Speed Control</h3>

For the speed control, each of the four 615 coreless brushed motors is controlled by an <b>AON6354 N-channel MOSFET</b> operating as a low-side switch. When the ESP32C3 sends a logic HIGH signal to M4 (the control pin), it creates a positive gate-to-source voltage (V<sub>gs</sub>) across the MOSFET. This positive V<sub>gs</sub> turns the MOSFET ON, allowing current to flow from drain to source. The ESP32C3 microcontroller generates <b>PWM </b>(Pulse Width Modulation) signals (25kHz frequency, 8-bit resolution) that modulate motor speed by varying the duty cycle from 0-100%.

<center>
<img src="/motordriver.png" alt="motordriver" width="300" height="auto">
</center>

<div style="text-align: center; font-family: 'Times New Roman', serif;">
  MOSFET Drive Circuit
</div>

<h3>Power</h3>

I used TI’s <b>TPS61099</b> boost converter IC to step up the 3.8V battery to 5V for the ESP32C3 and the 3V3 output pin on the ESP32C3 to power the IMU.

<center>
<img src="/5vboost.png" alt="5vboost" width="600" height="auto">
</center>
<div style="text-align: center; font-family: 'Times New Roman', serif;">
  Boost Circuit
</div>

<h2>PCB Layout</h2>
<div class = "sidetoside">
  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/pcbtop.png" alt="pcblayout" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;">Component Layout - MCU Board</span>
  </div>

  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/actualpcb.jpg" alt="pcbirl" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;">MCU Board</span>
  </div>
</div>
&nbsp;<br>&nbsp;<br>

<div class = "sidetoside">
  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/imulayout.png" alt="imulayout" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;">Component Layout - IMU Board</span>
  </div>

  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/imuplease.png" alt="imupcb" style="width: 100%; height: 100;" />
    <span style="font-family: 'Times New Roman', serif;">IMU Board</span>
  </div>
</div>
&nbsp;<br>&nbsp;<br>

This is the final version of the PCB layouts. I went through multiple iterations over the course of a month before finalising. Honestly this part of the project was pretty fulfilling as I learnt so much about electrical engineering and different methods to optimise a PCB.

<h2>Mistake no. 1</h2>

With the PCB and all the components settled, I began building the actual drone. I was going to start soldering on some pin headers and sockets onto the PCBs until I saw something smoke up while fiddling around with the parts. This is probably major mistake number 1.

<div class = "sidetoside">
  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/showconnector.png" alt="silkscreen" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;">Battery Connector Silkscreen</span>
  </div>

  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/wrongconnector.png" alt="wrong connection" style="width: 100%; height: 100;" />
    <span style="font-family: 'Times New Roman', serif;">Wrong Polarity</span>
  </div>
</div>
&nbsp;<br>&nbsp;<br>

Essentially what happened was that I did not check whether the battery polarity lined up with the connector's silkscreen. I placed in a PH 2.0 connector and the wrong terminals of the battery contacted the connector terminals on the PCB, reverse powering the buck, letting the magic smoke out.

<h2>PCB Assembly</h2>

<div class = "sidetoside">
  <div style="flex: 1; min-width: 100px; text-align: center;">
    <img src="/solderimu.png" alt="solderimu" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;"></span>
  </div>
  <div style="flex: 1; min-width: 100px; text-align: center;">
    <img src="/solderbrain.png" alt="solderbrain" style="width: 100%; height: 100;" />
    <span style="font-family: 'Times New Roman', serif;"></span>
  </div>
</div>

<div class = "sidetoside" style = "margin-top: -50px;">
  <div style="flex: 1; min-width: 100px; text-align: center;">
    <img src="/solderstack.png" alt="solderstack" style="width: 100%; height: 100;" />
    <span style="font-family: 'Times New Roman', serif;"></span>
  </div>
  <div style="flex: 1; min-width: 100px; text-align: center;">
    <img src="/connectors.png" alt="connectors" style="width: 100%; height: 100;" />
    <span style="font-family: 'Times New Roman', serif;"></span>
  </div>
</div>

<div style="text-align: center; font-family: 'Times New Roman', serif;">
  Electronics configuration
</div>
&nbsp;<br>&nbsp;<br>

I needed longer male pin headers but did not have them so I used two female headers with a pin in between instead.

<h2>Test</h2>

<div class="sidetoside" style="margin-top: -30px;">
  <div style="flex: 1; min-width: 300px; text-align: center;">
    <video src="/ledtest.mp4" controls class="video-embed" preload="metadata"></video>
    <span style="font-family: 'Times New Roman', serif;">Wi-Fi Test</span>
  </div>
  <div style="flex: 1; min-width: 300px; text-align: center;">
    <video src="/pleaseimu.mp4" controls class="video-embed" preload="metadata"></video>
    <span style="font-family: 'Times New Roman', serif;">IMU Test</span>
  </div>
</div>
&nbsp;<br>&nbsp;<br>

I tested the Wi-Fi capabilities of the ESP32 to make sure that it could actually receive commands and return information fast enough. For this, I included a small LED that I could toggle remotely. Very surprisingly, this somehow worked first try. The IMU data seemed pretty reasonable when testing so this part was done pretty fast as well.

<h2>Modelling — pt.2</h2>

The press-fit design came with multiple issues. Mainly it required trial and error to figure out the exact diameter for the motor, coupled with the inconsistencies of 3D printing. The fit was either too tight or too loose. So I came up with a clamp screw to lock the motor in place.

<div class = "sidetoside">
  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/screwclamp.png" alt="silkscreen" style="width: 100%; height: auto;" />
    <span style="font-family: 'Times New Roman', serif;">Screw Clamp</span>
  </div>

  <div style="flex: 1; min-width: 300px; text-align: center;">
    <img src="/droneold.png" alt="wrong connection" style="width: 100%; height: 100;" />
    <span style="font-family: 'Times New Roman', serif;">Drone v2</span>
  </div>
</div>

<h2>Flight?</h2>

Now came the moment of truth: can it fly? As the motors are directly powered by the battery, using a USB-C port from my laptop to power it for testing was not possible. The code was just to power each motors manually from my laptop through Wi-Fi, without processing any IMU data yet.

<center>
<video src="/droneoldtest.mp4" controls class="video-embed video-solo" preload="metadata"></video>
    <span style="font-family: 'Times New Roman', serif;">First "Flight" Test</span>
</center>
&nbsp;<br>&nbsp;<br>

To be frank, I would consider the result a partial failure. While I initially felt a sense of excitement at seeing my drone move, that feeling quickly gave way to a more critical awareness of its limitations. The moment was akin to watching a baby crawl, encouraging as a first step, but also a reminder of how far there is to go. It highlighted not just what had been achieved, but more importantly, what still needed improvement. The thrust was just not large enough, I needed stronger motors, larger propellers, <b> a new design. </b>

<h2>Rebirth</h2>

In hindsight, I probably should have done some calculations before buying the parts. Sounds stupid I know. So this time I actually did what I was supposed to.

<div id="cost-breakdown">
  <h2>Cost Breakdown</h2>
  <img src="/droneallcost.jpg" alt="Cost breakdown" style="width: 100%; height: auto;" />
</div>

<!-- ![PCB for the drone brain](/dronebrainpcb.jpg)

 -->
